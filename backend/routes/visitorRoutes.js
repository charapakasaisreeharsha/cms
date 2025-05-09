const router = require('express').Router();
const visitorController = require('../controllers/visitorController');

router.post('/checkin', visitorController.checkIn);
router.post('/checkout/:id', visitorController.checkOut);
router.get('/current', visitorController.getCurrent);
router.get('/history', visitorController.getHistory);

module.exports = router;