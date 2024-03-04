const { Router } = require('express');
const router = Router();
const userControllers = require('../controllers/userControllers');
router.get('/login', function (req, res) {
    res.render('login', { pageTitle: 'Login Page', path: '/login' });
});

router.get('/admin/users-dashboard', userControllers.getUsers);

module.exports = router;
