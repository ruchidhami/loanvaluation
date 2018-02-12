const express = require('express'),
  router = express.Router();

const LoginController = require('../controllers/login.controller');


router.post('/login', LoginController.login);


module.exports = router;