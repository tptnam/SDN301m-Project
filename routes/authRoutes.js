const { Router } = require('express');
const authControllers = require('../controllers/authControllers')
const router = Router();
router.post('/register', authControllers.registerAccount);
router.put('/change-password', authControllers.changePassword);
module.exports = router;
