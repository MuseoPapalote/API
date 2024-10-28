const express = require('express');
const router = express.Router();
const respuestaTriviaController = require('../controllers/respuestaTriviaController');
const {isAuthenticated} = require('../middlewares/isAuthenticated')

router.post('/', isAuthenticated, respuestaTriviaController.createRespuestaTrivia);

module.exports = router;