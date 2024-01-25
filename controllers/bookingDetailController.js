const bookingDetailModel = require("../database/Schemas/BookingDetail")
const CatchAsyncErrors = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

const getBookingDetailById = CatchAsyncErrors(async (req, res, next) => {
    try {
        const bookingId = req.params.id;
        const bookingDetail = await bookingDetailModel.findById(bookingId);
        if (!bookingDetail) {
            return res.status(404).json({
                success: false,
                message: "Booking is not found"
            })
        }
        return res.status(200).json({
            success: true,
            bookingDetail,
            message: "Get booking detail by ID successfully"
        })
    } catch (error) {
        next(error);
    }
})

const createBookingDetail = CatchAsyncErrors(async (req, res, next) => {
    try {
        const { menu, styleParty, service } = req.body;
        console.log("Yah:", req.body)
        // Kiểm tra xem các thuộc tính có tồn tại không
        if (!menu || !styleParty || !service) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request body. Please provide menu, styleParty, and service.'
            });
        }

        const bookingDetail = await bookingDetailModel.create({
            menu,
            styleParty,
            service
        });

        if (!bookingDetail) {
            return res.status(404).json({
                success: false,
                message: 'Failed to create a new booking detail'
            });
        }

        return res.status(200).json({
            success: true,
            bookingDetail,
            message: 'Create a new booking detail successfully!'
        });
    } catch (error) {
        next(error);
    }
});



const updateBookingDetail = CatchAsyncErrors(
    async (req, res, next) => {
        try {
            const bookingId = req.params.id;
            const { menu, service, styleParty } = req.body;
            const bookingDetail = await bookingDetailModel.findByIdAndUpdate(bookingId, req.body);
            const updatedBookingDetail = await bookingDetailModel.findById(bookingId);
            return res.status(200).json({
                success: true,
                updatedBookingDetail,
                message: 'Update a booking detail successfully!'
            })
        } catch (error) {
            next(error);
        }
    }
)

module.exports = {
    getBookingDetailById,
    updateBookingDetail,
    createBookingDetail
}