const { Router } = require('express');
const authControllers = require('../controllers/authControllers');
const router = Router();
const passport = require('passport');
const cors = require('cors');
router.use(cors());
router.post('/register', authControllers.registerAccount);
router.post('/login', authControllers.login); 
router.put('/change-password', authControllers.changePassword);
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account',
        state: true,
    }),
);

router.get(
    '/google/callback',
    passport.authenticate('google'),
    function (req, res) {
        // console.log(req.user.googleId);
        if (req.isAuthenticated) {
            res.cookie('userID', req.user.googleId);
            res.redirect('http://localhost:3000');
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    },
);
module.exports = router;
