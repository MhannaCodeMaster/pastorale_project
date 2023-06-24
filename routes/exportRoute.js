const express = require("express");
const app = express();
const exportController = require('../controllers/exportController')

app.get("/export/donations", exportController.exportDonations)

app.post("/export/donations", exportController.exportDonationsSelected)
module.exports = app