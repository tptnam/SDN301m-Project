const { Router } = require('express');
const router = Router();
const userControllers = require('../controllers/userControllers');
router.get('/login', function (req, res) {
    res.render('login', { pageTitle: 'Login Page', path: '/login' });
});
router.get('/register', function (req, res) {
    res.render('register', { pageTitle: 'Login Page', path: '/register' });
});
router.get('/admin/users-dashboard', userControllers.getUsers);

module.exports = router;
