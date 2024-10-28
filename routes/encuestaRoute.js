const express = require('express');
const router = express.Router();
const encuestaController = require('../controllers/encuestaController');
const {isAuthenticated} = require('../middlewares/isAuthenticated');

router.post('/', isAuthenticated, encuestaController.createAnswer);

module.exports = router;