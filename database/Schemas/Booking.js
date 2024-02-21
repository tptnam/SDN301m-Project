const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Package',
            require
        },
        amountOfVisitor: {
            type: Number,
            required: [true, "Please provide the number of visitor"]
        },
        fullNameParent: {
            type: String,
            required: [true, "Please enter the fullName of parent"]
        },
        phoneNumber: {
            type: String,
            required: [true, "Please enter the phoneNumber"]
        },
        email: {
            type: String,
            required: [true, "Please enter the email"]
        },
        fullNameChildren: {
            type: String,
            required: [true, "Please enter the fullName of children"]
        },
        dateOfBirth: {
            type: String,
            required: [true, "Please enter the date of birth"]
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            default: "male",
        },
        status: {
            type: String,
            enum: ["accepted", "cancel", "pending"],
            default: "pending",
        },
    },
    { timestamps: true }
)
const BookingModel = mongoose.model("Booking", bookingSchema) || mongoose.model.booking
module.exports = BookingModel;