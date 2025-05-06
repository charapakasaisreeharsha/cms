const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Handle user signup
exports.signup = async (req, res) => {
  const { phone_number, password, name, role, unit, employee_id } = req.body;

  try {
    // Validate required fields
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

    // Check if phone number already exists
    const [user] = await db.query('SELECT * FROM users WHERE phone_number = ?', [phone_number]);
    if (user.length > 0) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const [result] = await db.query(
      'INSERT INTO users (name, phone_number, password, role, unit, employee_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [name, phone_number, hashedPassword, role, unit || null, employee_id || null]
    );

    const userId = result.insertId;

    // Generate JWT
    const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return user data and token
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
    console.error(err);
    res.status(500).json({ error: 'Error during registration' });
  }
};

// Handle user login
exports.login = async (req, res) => {
  const { phone_number, password, role } = req.body;

  try {
    // Validate input
    if (!phone_number || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Fetch user from database
    const [users] = await db.query('SELECT * FROM users WHERE phone_number = ? AND role = ?', [phone_number, role]);
    if (users.length === 0) {
      return res.status(400).json({ error: 'User not found or incorrect role' });
    }

    const user = users[0];

    // Compare the entered password with the stored password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return user data and token
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
    console.error(err);
    res.status(500).json({ error: 'Error during login' });
  }
};