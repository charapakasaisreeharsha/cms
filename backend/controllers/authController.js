 const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios');
const db = require('../config/db');

// ⚠️ Temporary OTP storage — use Redis or DB in production
const otpStore = {};

// ========== SIGNUP ==========
exports.signup = async (req, res) => {
  const { phone_number, password, name, role, unit, employee_id } = req.body;

  try {
    if (!name || !phone_number || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['resident', 'security', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    if ((role === 'resident' || role === 'admin') && !unit) {
      return res.status(400).json({ error: 'Unit is required for resident or admin' });
    }

    if (role === 'security' && !employee_id) {
      return res.status(400).json({ error: 'Employee ID is required for security' });
    }

    const [user] = await db.query('SELECT * FROM users WHERE phone_number = ?', [phone_number]);
    if (user.length > 0) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users (name, phone_number, password, role, unit, employee_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [name, phone_number, hashedPassword, role, unit || null, employee_id || null]
    );

    const userId = result.insertId;

    const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      id: userId,
      name,
      phone_number,
      role,
      unit: unit || null,
      employee_id: employee_id || null,
      token,
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Error during registration' });
  }
};

// ========== LOGIN ==========
exports.login = async (req, res) => {
  const { phone_number, password, role } = req.body;

  try {
    if (!phone_number || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [users] = await db.query(
      'SELECT * FROM users WHERE phone_number = ? AND role = ?',
      [phone_number, role]
    );

    if (users.length === 0) {
      return res.status(400).json({ error: 'User not found or incorrect role' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      id: user.id,
      name: user.name,
      phone_number: user.phone_number,
      role: user.role,
      unit: user.unit || null,
      employee_id: user.employee_id || null,
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Error during login' });
  }
};

// ========== SEND OTP ==========
// ========== SEND OTP ==========
exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ success: false, message: 'Mobile number required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[mobile] = otp;

  try {
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "otp",
        variables_values: otp,
        numbers: mobile,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error('OTP send error:', err?.response?.data || err.message);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// ========== RESET PASSWORD ==========
exports.resetPassword = async (req, res) => {
  const { mobile, otp, password } = req.body;

  if (!mobile || !otp || !password) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  if (otpStore[mobile] !== otp) {
    return res.status(401).json({ success: false, message: 'Invalid OTP' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("UPDATE users SET password = ? WHERE phone_number = ?", [hashedPassword, mobile]);

    delete otpStore[mobile];
    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ success: false, message: "Failed to reset password" });
  }
};
