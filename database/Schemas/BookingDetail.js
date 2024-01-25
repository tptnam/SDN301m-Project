const mongoose = require("mongoose");
const bookingDetailSchema = new mongoose.Schema(
    {
        menu: {
            type: String,
            require: [true, "Please provide.."]
        },
        styleParty: {
            type: String,
            require: [true, "Please provide.."]
        },
        service: {
            type: String,
            require: [true, "Please provide.."]
        }
    },
    { timestamps: true }
);

const bookingDetailModel = mongoose.model("bookingDetails", bookingDetailSchema);

module.exports = bookingDetailModel;