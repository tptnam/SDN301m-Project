const express = require('express');
const { getBookingDetailById, createBookingDetail, getAllBookingDetail, updateBookingPackage, deleteBookingDetail } = require('../controllers/bookingDetailController.js')
const verifyToken = require('../middleware/verify.js');
const bookingDetailRouter = express.Router();
bookingDetailRouter.post("/bookingdetail",verifyToken, createBookingDetail)
bookingDetailRouter.get("/bookingdetail/:id",verifyToken, getBookingDetailById)
bookingDetailRouter.put('/bookingdetail/:id',verifyToken, updateBookingPackage)
bookingDetailRouter.get('/bookingdetail', verifyToken, getAllBookingDetail)
bookingDetailRouter.delete('/bookingdetail/:id',verifyToken, deleteBookingDetail)
module.exports = bookingDetailRouter;