const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAllAnnouncements
} = require('../controllers/announcementController');

console.log('announcementRoutes loaded', { createAnnouncement, getAllAnnouncements });

router.post('/', createAnnouncement);
router.get('/', (req, res) => {
  console.log('GET /api/announcements route hit');
  getAllAnnouncements(req, res);
});

module.exports = router;