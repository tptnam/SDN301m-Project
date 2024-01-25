const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
const db = require('./database/dtb');
// const User = require('./database/Schemas/User');
// const Booking = require('./database/Schemas/Booking');
const BookingDetail = require('./routes/bookingDetailRoutes.js')

app.use('/api', BookingDetail)
db();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
