const express = require('express');
const app = express();
const b_controller = require('../controllers/beneficary-controller');

app.get('/all-beneficiaries', b_controller.getTable);
app.post('/all-beneficiaries/close',b_controller.postClose);
// app.get();

module.exports = app;