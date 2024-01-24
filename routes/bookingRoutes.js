const express = require('express');
const { getAllBookings, createBooking, getBookingById, updateBooking, deleteBooking } = require('../controllers/bookingController.js');

const bookingRouter = express.Router();

bookingRouter.get("/booking", getAllBookings);
bookingRouter.post("/booking/create", createBooking)
bookingRouter.get("/booking/:id", getBookingById)
bookingRouter.put("/booking/update/:id", updateBooking)
bookingRouter.delete("/booking/delete/:id", deleteBooking)

module.exports = bookingRouter;