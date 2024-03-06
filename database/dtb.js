const mongoose = require('mongoose');

async function connectDB() {
    const url = 'mongodb://localhost:27017/booking-birthday';

    try {
        const connection = await mongoose.connect(url);
        console.log(`Connected to DB at ${connection.connection.host}`);
    } catch (err) {
        console.error(err.message);
        setTimeout(connectDB, 5000);
    }
}

module.exports = connectDB;
