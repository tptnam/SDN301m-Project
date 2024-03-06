const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true,ref:'User' },

    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
});

module.exports = mongoose.model('UserToken', TokenSchema);
