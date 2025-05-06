const db = require('../config/db');

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, priority } = req.body;
    const [result] = await db.execute(
      'INSERT INTO announcements (title, content, priority) VALUES (?,?,?)',
      [title, content, priority]
    );
    const announcementId = result.insertId;

    await db.execute(
      `INSERT INTO notifications (user_id, announcement_id)
       SELECT id, ? FROM users WHERE role = 'resident'`,
      [announcementId]
    );

    res.status(201).json({ announcementId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAllAnnouncements = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, title, content, priority, created_at AS date FROM announcements ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};