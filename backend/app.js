 const express = require('express');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
require('dotenv').config();

const announcementRoutes = require('./routes/announcementRoutes');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api', announcementRoutes); // Mount at /api to avoid double prefix
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

console.log('Registered routes:', listEndpoints(app));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));