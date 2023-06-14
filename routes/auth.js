const express = require('express');
const app = express();
const authController = require('../controllers/auth-controller');

app.get('/login',authController.getLogin);
app.post('/login',authController.postLogin);
app.get('/logout',authController.logout);
app.post('/forgot-password',authController.forgotPass);
app.get('/forgot-password/reset',authController.getResetPage);

module.exports = app;