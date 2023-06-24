const express = require('express');
const app = express();
const export_controller = require('../exports/export-all');

app.post('/export/beneficiary', export_controller.exportAll);
app.post('/export/beneficiaries', export_controller.postExport);
app.get('/export',export_controller.getPage);

module.exports = app;