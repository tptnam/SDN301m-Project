const mongoose = require("mongoose");
const bookingDetailSchema = new mongoose.Schema(
    {
        menu: {
            type: String,
            require: [true]
        },
        styleParty: {
            type: String,
            require: [true]
        },
        service: {
            type: String,
            require: [true]
        }
    },
    { timestamps: true }
);

const bookingDetailModel = mongoose.model("Booking Detail", bookingDetailSchema);

module.exports = bookingDetailModel;