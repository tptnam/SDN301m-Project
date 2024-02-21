const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
const db = require('./database/dtb');

const BookingDetail = require('./routes/bookingDetailRoutes.js');
const Packages = require('./routes/packagesRoutes.js');
const Booking = require('./routes/bookingRoutes.js');
app.get('/', (req, res) => {
    res.send('Hello world')
})
app.use('/api', Packages);
app.use('/api', Booking);
app.use('/api', BookingDetail);
db();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
