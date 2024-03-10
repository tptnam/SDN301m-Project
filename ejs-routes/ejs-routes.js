const { Router } = require("express");
const router = Router();
const userControllers = require('../controllers/userControllers');
const bookingController = require('../controllers/bookingController');
const Booking = require('../database/Schemas/Booking')
router.get('/login', function (req, res) {
    res.render('login', { pageTitle: 'Login Page', path: '/login' });
})
const MenuController = require("../controllers/MenuController");

router.get("/register", function (req, res) {
    res.render("register", { pageTitle: "Login Page", path: "/register" });
});
router.get("/admin/users-dashboard", userControllers.getUsers);

router.get("/admin/menuDashboard", MenuController.getAllMenu);

// router.get('/', function (req, res) {
//     res.render('./home.ejs', { pageTitle: 'Home Page' })
// })

router.get('/admin/bookingDashboard', bookingController.getAllBookings)

router.get('/edit/:id', bookingController.getBookingById)

router.post('/booking/:id', bookingController.updateBooking)

router.get('/delete/:id', bookingController.deleteBooking)
module.exports = router;
