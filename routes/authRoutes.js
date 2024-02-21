const { Router } = require('express');
const authControllers = require('../controllers/authControllers');
const router = Router();
const passport = require('passport');
const cors = require('cors');
const { JwtStrategy } = require('../utils/JWT-helpers');
router.use(cors());
passport.use(JwtStrategy);
router.post('/register', authControllers.registerAccount);
router.post('/login', authControllers.login);
router.post('/validate-password', authControllers.compareOldPassword);
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
// router.get(
//     '/validate-token',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//         if (req.user) {
//             res.json({ message: 'hehehe' });
//         } else {
//             res.status(401).send({ message: 'hehehe' });
//         }
//     },
// );
module.exports = router;
