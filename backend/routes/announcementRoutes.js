// routes/announcementRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const announcementController = require('../controllers/announcementController');

router.get('/announcements', authenticateToken, announcementController.getAllAnnouncements);
router.post('/announcements', authenticateToken, announcementController.createAnnouncement);
router.put('/announcements/:id', authenticateToken, announcementController.updateAnnouncement);
router.delete('/announcements/:id', authenticateToken, announcementController.deleteAnnouncement);

module.exports = router;