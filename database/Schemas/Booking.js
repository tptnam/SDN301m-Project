const mongoose = require('mongoose');
const User = require('./User');
const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.String,
        },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('booking', bookingSchema);
