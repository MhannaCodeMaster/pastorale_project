const express = require("express");
const app = express();
const exportController = require('../controllers/exportController');
const exportBen_controller = require('../controllers/export-beneficiaries');

app.get("/export/donations", exportController.exportDonations)
app.post("/export/donations", exportController.exportDonationsSelected)

app.post('/export/beneficiary', exportBen_controller.exportAll);
app.post('/export/beneficiaries', exportBen_controller.postExport);
app.get('/export',exportBen_controller.getPage);


module.exports = app