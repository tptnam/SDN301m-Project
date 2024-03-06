const { Router } = require('express');
const router = Router();
const userControllers = require('../controllers/userControllers');
const { getAllPackages } = require('../controllers/packagesController');
router.get('/login', function (req, res) {
    res.render('login', { pageTitle: 'Login Page', path: '/login' });
});

// router.get('/packages', async (req, res, next) => {
//     try {
//       const packages = await getAllPackages(req, res, next);
//       res.render('package', { packages });
//     } catch (error) {
//       console.error("Error fetching packages:", error);
//       res.status(500).json({ error: error.message });
//     }
//   });
  





router.get('/admin/users-dashboard', userControllers.getUsers);

router.get('/admin/users-dashboard', userControllers.getUsers);





module.exports = router;
