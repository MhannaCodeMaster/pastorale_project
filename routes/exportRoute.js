const express = require("express");
const app = express();
const exportController = require('../controllers/exportController')

app.get("/export/donations", exportController.exportDonations)

app.post("/export/donations", exportController.exportDonationsSelected)
// app.post('/export/beneficiary', export_controller.exportAll);
// app.post('/export/beneficiaries', export_controller.postExport);
// app.get('/export',export_controller.getPage);

module.exports = app