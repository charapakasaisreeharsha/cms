const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes for complaints
router.post('/', authenticateToken, complaintController.createComplaint);
router.get('/', authenticateToken, complaintController.getComplaints);
router.put('/:id', authenticateToken, complaintController.updateComplaint);
router.put('/:id/resolve', authenticateToken, complaintController.resolveComplaint);

module.exports = router;