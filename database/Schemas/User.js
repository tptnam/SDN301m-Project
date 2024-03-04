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
    active: {
        type: mongoose.SchemaTypes.Boolean,
        default: true
    },
    role:{
        type:mongoose.SchemaTypes.String,
        default: 'user'
    }
});
module.exports = mongoose.model('user', userSchema);
