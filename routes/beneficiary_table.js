const express = require('express');
const app = express();
const b_controller = require('../controllers/beneficary-controller');

app.get('/all-beneficiaries', b_controller.getTable);
// app.get();
// app.get();

module.exports = app;