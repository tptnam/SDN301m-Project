const express = require('express');
const { getBookingDetailById, updateBookingDetail } = require('../controllers/bookingDetailController.js')

const bookingDetailRouter = express.Router();

bookingDetailRouter.get("/bookingdetail/:id", getBookingDetailById)
bookingDetailRouter.put('/bookingdetail/update/:id', updateBookingDetail)

module.exports = bookingDetailRouter;