const express = require('express');
const { getAllBookings, createBooking, getBookingById, updateBooking, deleteBooking } = require('../controllers/bookingController.js');
const verifyToken = require('../middleware/verify.js');
const bookingRouter = express.Router();

bookingRouter.get("/booking", getAllBookings);
bookingRouter.post("/booking", createBooking)
bookingRouter.get("/booking/:id", getBookingById)
bookingRouter.put("/booking/:id", updateBooking)
bookingRouter.delete("/booking/:id", verifyToken, deleteBooking)

module.exports = bookingRouter;