const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: new Date(),
    },
});
module.exports = mongoose.model('user', userSchema);
