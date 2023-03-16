const express = require('express');
const router = express.Router();
const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

router.post('/', authLoginUserMiddleware, loginController.createLogin);

module.exports = router;