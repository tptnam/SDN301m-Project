const { Router } = require('express');
const router = Router();
const userControllers = require('../controllers/userControllers');
router.get('/users', userControllers.getUsers);
router.get('/users/:id', userControllers.getUserById);
router.post('/users/delete/:id', userControllers.deleteUser);
router.put('/users/update', userControllers.updateUser);
module.exports = router;
