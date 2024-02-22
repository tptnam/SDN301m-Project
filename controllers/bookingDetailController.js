const bookingDetailModel = require("../database/Schemas/BookingDetail")
const PackageModel = require("../database/Schemas/Packages")

const CatchAsyncErrors = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

const getAllBookingDetail = CatchAsyncErrors(async (req, res, next) => {
    try {
        const bookingDetail = await bookingDetailModel.find({});
        if (!bookingDetail) {
            return res.status(404).json({
                success: false,
                message: 'Package not found'
            });
        }
        return res.status(200).json({
            success: true,
            bookingDetail,
            message: 'Get all packages successfully!'
        });
    } catch (error) {
        next(error);
    }
});

const getBookingDetailById = CatchAsyncErrors(async (req, res, next) => {
    try {
        const bookingDetailId = req.params.id;
        
        const bookingDetail = await bookingDetailModel.findOne({ _id: bookingDetailId })
            .populate({
                path: 'package',
                model: PackageModel // Sử dụng model PackageModel đã được import
            })
            .exec();
            console.log("Here", bookingDetail);
        if (!bookingDetail) {
            return res.status(404).json({ success: false, message: 'Booking detail not found' });
        }

        return res.status(200).json({ success: true, bookingDetail });
    } catch (error) {
        console.error('Error finding booking detail:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


const createBookingDetail = CatchAsyncErrors(async (req, res, next) => {
    try {
        const { package, menu, styleParty, service } = req.body; // Lấy giá trị của trường package từ req.body
        // Kiểm tra xem các thuộc tính có tồn tại không
        if (!package || !menu || !styleParty || !service) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request body. Please provide package, menu, styleParty, and service.'
            });
        }

        const bookingDetail = await bookingDetailModel.create({
            package, // Sử dụng giá trị của trường package từ req.body
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



const updateBookingPackage = async (req, res, next) => {
    try {
        const bookingDetailId = req.params.id;
        const { menu, styleParty, service} = req.body;

        // Tìm kiếm bookingDetail và populate thông tin về gói hàng
        const bookingDetail = await bookingDetailModel.findOne({ _id: bookingDetailId })
            .populate({
                path: 'package',
                model: PackageModel
            })
            .exec();

        if (!bookingDetail) {
            return res.status(404).json({ success: false, message: 'Booking detail not found' });
        }

        // Cập nhật các trường menu, styleParty, và service nếu chúng tồn tại trong req.body
        if (menu) {
            bookingDetail.menu = menu;
        }
        if (styleParty) {
            bookingDetail.styleParty = styleParty;
        }
        if (service) {
            bookingDetail.service = service;
        }

        // Lưu bookingDetail đã được cập nhật
        await bookingDetail.save();

        return res.status(200).json({ success: true, message: 'Booking package updated successfully' });
    } catch (error) {
        console.error('Error updating booking package:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const deleteBookingDetail = async (req, res, next) => {
    try {
        const bookingDetailId = req.params.id;

        // Tìm bookingDetail để xóa
        const bookingDetail = await bookingDetailModel.findById(bookingDetailId);

        // Kiểm tra xem bookingDetail tồn tại hay không
        if (!bookingDetail) {
            return res.status(404).json({ success: false, message: 'Booking detail not found' });
        }

        // Xóa bookingDetail
        await bookingDetailModel.deleteOne({ _id: bookingDetailId });

        return res.status(200).json({ success: true, message: 'Booking detail deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking detail:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


module.exports = {
    getBookingDetailById,
    updateBookingPackage,
    createBookingDetail,
    getAllBookingDetail,
    deleteBookingDetail
}