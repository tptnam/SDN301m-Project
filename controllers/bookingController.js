const BookingModel = require("../database/Schemas/Booking.js");
const bookingModel = require("../database/Schemas/Booking.js");
const { refreshToken } = require('../utils/JWT-helpers');

const CatchAsyncErrors = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// const getAllBookings = CatchAsyncErrors(async (req, res, next) => {
//   try {
//     const bookings = await bookingModel.find({});
//     if (!bookings) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       bookings,
//       message: "Get all bookings successfully!",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

const getAllBookings = async (req, res) => {
  const accessToken = await refreshToken(
    req.cookies.accessToken,
    req.cookies.refreshToken,
  );
  if (accessToken) {
    const bookings = await BookingModel.find(
      { role: { $ne: 'admin' } },
      {
        _id: 1,
        fullNameParent: 1,
        phoneNumber: 1,
        email: 1,
        dateOfBirth: 1,
        gender: 1,
        dateBooking: 1,
        status: 1,
      },
    );
    if (bookings)
      res.render('booking', {
        path: 'booking',
        pageTitle: 'Bookings dashboard',
        bookings: bookings,
      });
    else res.status(404);
  } else res.status(401);
};

const getBookingById = CatchAsyncErrors(async (req, res, next) => {
  try {
    const bookingID = req.params.id;
    // console.log("id", bookingID);

    const booking = await bookingModel.findById(bookingID);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    return res.status(200).json({
      success: true,
      booking,
      message: "Get booking by ID successfully",
    });
  } catch (error) {
    next(error);
  }
});

const createBooking = CatchAsyncErrors(async (req, res, next) => {
  try {
    const {
      amountOfVisitor,
      fullNameParent,
      phoneNumber,
      email,
      fullNameChildren,
      dateOfBirth,
      gender,
      status,
      dateBooking,
      timeBooking
    } = req.body;
    const bookings = await bookingModel.create({
      amountOfVisitor,
      fullNameParent,
      phoneNumber,
      email,
      fullNameChildren,
      dateOfBirth,
      gender,
      status,
      dateBooking,
      timeBooking
    });
    if (!bookings) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    return res.status(201).json({
      success: true,
      bookings,
      message: "Create a new booking successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const updateBooking = CatchAsyncErrors(async (req, res, next) => {
  try {
    const bookingID = req.params.id;
    const {
      amountOfVisitor,
      fullNameParent,
      phoneNumber,
      fullNameChildren,
      dateOfBirth,
      gender,
      status,
      dateBooking,
      timeBooking
    } = req.body;
    const bookings = await bookingModel.findByIdAndUpdate(bookingID, req.body);
    const updatedBooking = await bookingModel.findById(bookingID);

    return res.status(200).json({
      success: true,
      updatedBooking,
      message: "Update a booking successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const deleteBooking = CatchAsyncErrors(async (req, res, next) => {
  try {
    const bookingID = req.params.id;

    const booking = await bookingModel.findByIdAndDelete(bookingID);
    return res.status(200).json({
      success: true,
      booking,
      message: "Delete a booking successfully!",
    });
  } catch (error) {
    next(error);
  }
});
module.exports = {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
};
