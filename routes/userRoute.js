const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAdmin } = require('../middlewares/isAdmin');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.delete('/delete',isAuthenticated, userController.deleteUser);
router.post('/createAdmin', isAdmin, userController.createInitialAdmin);

module.exports = router;