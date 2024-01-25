const express = require('express');
const { getBookingDetailById, updateBookingDetail, createBookingDetail } = require('../controllers/bookingDetailController.js')

const bookingDetailRouter = express.Router();
bookingDetailRouter.post("/bookingdetail", createBookingDetail)
bookingDetailRouter.get("/bookingdetail/:id", getBookingDetailById)
bookingDetailRouter.put('/bookingdetail/update/:id', updateBookingDetail)

module.exports = bookingDetailRouter;