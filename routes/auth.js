const express = require('express');
const app = express();
const authController = require('../controllers/auth-controller');

app.get('/login',authController.getLogin);
app.post('/login',authController.postLogin);
app.post('/forgot-password',authController.forgotPass);
app.get('/forgot-password/reset',authController.getResetPage);
app.post('/forgot-password/reset',authController.postResetPass);
app.get('/logout',authController.logout);

module.exports = app;