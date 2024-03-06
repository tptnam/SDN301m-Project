const express = require('express');
const { getBookingDetailById, createBookingDetail, getAllBookingDetail, updateBookingPackage, deleteBookingDetail } = require('../controllers/bookingDetailController.js')

const bookingDetailRouter = express.Router();
bookingDetailRouter.post("/bookingdetail", createBookingDetail)
bookingDetailRouter.get("/bookingdetail/:id", getBookingDetailById)
bookingDetailRouter.put('/bookingdetail/:id', updateBookingPackage)
bookingDetailRouter.get('/bookingdetail', getAllBookingDetail)
bookingDetailRouter.delete('/bookingdetail/:id', deleteBookingDetail)
module.exports = bookingDetailRouter;