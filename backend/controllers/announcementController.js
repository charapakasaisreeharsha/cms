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
    console.error('Error creating announcement:', err);
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
    console.error('Error fetching announcements:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, priority } = req.body;
    const [result] = await db.execute(
      'UPDATE announcements SET title = ?, content = ?, priority = ?, created_at = NOW() WHERE id = ?',
      [title, content, priority, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    // Update notifications for residents
    await db.execute('DELETE FROM notifications WHERE announcement_id = ?', [id]);
    await db.execute(
      `INSERT INTO notifications (user_id, announcement_id)
       SELECT id, ? FROM users WHERE role = 'resident'`,
      [id]
    );

    res.json({ id: Number(id), title, content, priority, date: new Date().toISOString() });
  } catch (err) {
    console.error('Error updating announcement:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    // First delete dependent notifications to satisfy foreign-key constraint
    await db.execute('DELETE FROM notifications WHERE announcement_id = ?', [id]);

    // Then delete the announcement record
    const [result] = await db.execute('DELETE FROM announcements WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    console.error('Error deleting announcement:', err);
    res.status(500).json({ error: 'Database error' });
  }
};
