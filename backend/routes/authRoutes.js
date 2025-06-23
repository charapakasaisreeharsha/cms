const express = require('express');
const router = express.Router();

// Import all required handlers from authController
const {
  signup,
  login,
  sendOTP,
  resetPassword
} = require('../controllers/authController');

// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

// Route to send OTP
router.post('/send-otp', sendOTP);

// Route to reset password
router.post('/reset-password', resetPassword);

module.exports = router;

