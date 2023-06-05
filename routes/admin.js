const express = require('express');
const app = express();
const adminController = require('../controllers/admin-controller');

app.get('/',adminController.getIndex);

module.exports = app;