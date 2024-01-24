const bookingModel = require("../database/Schemas/Booking.js")

const CatchAsyncErrors = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

const getAllBookings = CatchAsyncErrors(async (req, res, next) => {
    try {
        const bookings = await bookingModel.find({});
        if (!bookings) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        return res.status(200).json({
            success: true,
            bookings,
            message: 'Get all bookings successfully!'
        });
    } catch (error) {
        next(error);
    }
});

const createBooking = CatchAsyncErrors(
    async (req, res, next) => {
        try {
            const { amountOfVisitor, fullNameParent, phoneNumber, email, fullNameChildren, dateOfBirth, gender, status } = req.body;
            const bookings = await bookingModel.create({
                amountOfVisitor,
                fullNameParent,
                phoneNumber,
                email,
                fullNameChildren,
                dateOfBirth,
                gender,
                status,
            })
            if (!bookings) {
                return res.status(404).json({
                    success: false,
                    message: 'Booking not found'
                });
            }
            return res.status(200).json({
                success: true,
                bookings,
                message: 'Create a new booking successfully!'
            })
        } catch (error) {
            next(error);
        }
    }
)

const getBookingById = CatchAsyncErrors(async (req, res, next) => {
    try {
        const bookingID = req.params.id;
        console.log('id', bookingID);
        const booking = await bookingModel.findById(bookingID);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        return res.status(200).json({
            success: true,
            booking,
            message: 'Get booking by ID successfully'
        });
    } catch (error) {
        next(error);
    }
});

const updateBooking = CatchAsyncErrors(
    async (req, res, next) => {
        try {
            const bookingID = req.params.id;
            const { amountOfVisitor, fullNameParent, phoneNumber, fullNameChildren, dateOfBirth, gender, status } = req.body;
            const bookings = await bookingModel.findByIdAndUpdate(bookingID, req.body);
            const updatedBooking = await bookingModel.findById(bookingID);
            return res.status(200).json({
                success: true,
                updatedBooking,
                message: 'Update a booking successfully!'
            })
        } catch (error) {
            next(error);
        }
    }
)

const deleteBooking = CatchAsyncErrors(
    async (req, res, next) => {
        try {
            const bookingID = req.params.id;

            const booking = await bookingModel.findByIdAndDelete(bookingID);
            return res.status(200).json({
                success: true,
                booking,
                message: 'Delete a booking successfully!'
            })
        } catch (error) {
            next(error);
        }
    }
)
module.exports = {
    getAllBookings,
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking
}