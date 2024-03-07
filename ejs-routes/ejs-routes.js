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

router.get('/', function (req, res) {
    res.render('./home.ejs', { pageTitle: 'Home Page' })
})

// router.get('/booking', function (req, res) {
//     res.render('./booking.ejs', { pageTitle: 'Booking List' })
// })
router.get('/booking', bookingController.getAllBookings)

router.post("/add", (req, res) => {
    const booking = new Booking({
        fullNameParent: req.body.fullNameParent,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        fullNameChildren: req.body.fullNameChildren,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        // status: req.body.status,
        dateBooking: req.body.dateBooking,
        timeBooking: req.body.timeBooking
    })
    console.log(booking)
    res.redirect('/')
})
module.exports = router;
