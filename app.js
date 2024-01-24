const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;
app.use(cors());
const db = require('./database/dtb');
const User = require('./database/Schemas/User');
const Booking = require('./database/Schemas/Booking');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser')
db();
app.use(bodyParser())
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use('/api/v1/auth', authRoutes);
