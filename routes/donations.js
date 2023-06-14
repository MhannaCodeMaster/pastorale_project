const express = require("express");
const app = express();
const donationController = require('../controllers/donationController');

app.get('/donations', donationController.getAllDonations);

// Route to render the edit donation form
app.get('/donations/edit/:id', donationController.editDonationForm);

// Route to update a donation


app.get('/donations/add', donationController.emptyDonationForm);


app.post('/donations/submit', donationController.insertDonation)



app.post('/donations/update/:id', donationController.updateDonation)

module.exports = app