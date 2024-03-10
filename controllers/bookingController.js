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
        fullNameChildren: 1,
        amountOfVisitor: 1,
        timeBooking: 1
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

    const booking = await BookingModel.findById(bookingID);
    if (booking)
      res.render('edit_booking', {
        path: 'edit_booking',
        pageTitle: 'Bookings dashboard',
        booking: booking,
      })
  } catch (error) {
    next(error);
  }
});

const createBooking = CatchAsyncErrors(async (req, res, next) => {
  try {
    const bookings = await BookingModel.create({
      amountOfVisitor: req.body.amountOfVisitor,
      fullNameParent: req.body.fullNameParent,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      fullNameChildren: req.body.fullNameChildren,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      dateBooking: req.body.dateBooking,
      timeBooking: req.body.timeBooking,
      status: "accepted",
    });
    if (!bookings) {
      return res.status(404).json({
        success: false,
        message: "Unsuccessfully",
      });
    }
    return res.redirect('/admin/bookingDashboard')
  } catch (error) {
    next(error);
  }
});

const updateBooking = CatchAsyncErrors(async (req, res, next) => {
  const { amountOfVisitor, fullNameParent, phoneNumber, fullNameChildren, dateOfBirth, email, gender, status, dateBooking, timeBooking } = req.body;
  try {

    const booking = await BookingModel.findByIdAndUpdate(
      req.params.id, {
      amountOfVisitor, fullNameParent, phoneNumber, fullNameChildren, dateOfBirth, email, gender, status, dateBooking, timeBooking
    },
      { new: true })

    if (!booking) {
      throw new Error("Section not found");
    }
    res.redirect('/admin/bookingDashboard')
  } catch (error) {
    next(error);
  }

});

const deleteBooking = CatchAsyncErrors(async (req, res, next) => {
  try {
    const bookingID = req.params.id;

    const booking = await bookingModel.findByIdAndDelete(bookingID);
    if (booking)
      res.redirect('/admin/bookingDashboard')
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
