const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/register', isAuthenticated, visitController.registerVisit);

module.exports = router;