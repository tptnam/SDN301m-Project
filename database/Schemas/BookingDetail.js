const mongoose = require("mongoose");
const bookingDetailSchema = new mongoose.Schema(
    {
        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Package',
            require
        },
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



module.exports = mongoose.model("bookingDetails", bookingDetailSchema) || mongoose.model.bookingdetails