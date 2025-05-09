const express = require('express');
const router = express.Router();
// If you don't require authentication, remove middleware references

const {
  createAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} = require('../controllers/announcementController');

console.log('announcementRoutes loaded', {
  createAnnouncement: typeof createAnnouncement,
  getAllAnnouncements: typeof getAllAnnouncements,
  updateAnnouncement: typeof updateAnnouncement,
  deleteAnnouncement: typeof deleteAnnouncement,
});

// Create announcement (no auth)
router.post('/', (req, res) => {
  console.log('POST /api/announcements route hit');
  createAnnouncement(req, res);
});

// Get all announcements
router.get('/', (req, res) => {
  console.log('GET /api/announcements route hit');
  getAllAnnouncements(req, res);
});

// Update announcement
router.put('/:id', (req, res) => {
  console.log(`PUT /api/announcements/${req.params.id} route hit`);
  updateAnnouncement(req, res);
});

// Delete announcement
router.delete('/:id', (req, res) => {
  console.log(`DELETE /api/announcements/${req.params.id} route hit`);
  deleteAnnouncement(req, res);
});

module.exports = router;
