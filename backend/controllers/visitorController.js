const pool = require('../config/db');

exports.checkIn = async (req, res) => {
  const { name, phone, email, address, purpose } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO visitors (name, phone, email, address, purpose) VALUES (?, ?, ?, ?, ?)`,
      [name, phone, email, address, purpose]
    );
    const [rows] = await pool.query(`SELECT * FROM visitors WHERE id = ?`, [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to check in visitor' });
  }
};

exports.checkOut = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`UPDATE visitors SET check_out = NOW() WHERE id = ?`, [id]);
    const [rows] = await pool.query(`SELECT * FROM visitors WHERE id = ?`, [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to check out visitor' });
  }
};

exports.getCurrent = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM visitors WHERE check_out IS NULL ORDER BY check_in DESC`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch current visitors' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM visitors ORDER BY check_in DESC`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch visitor history' });
  }
};