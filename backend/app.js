const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const listEndpoints = require('express-list-endpoints');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

console.log('Imported announcementRoutes:', announcementRoutes);
console.log('Imported authRoutes:', authRoutes);

app.use('/api/announcements', announcementRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/auth', authRoutes);

console.log('Registered routes:', listEndpoints(app));

app.use((req, res) => res.status(404).send(`No route for ${req.method} ${req.path}`));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));