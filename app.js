const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./util/database');
const donationController = require('./controllers/donationController');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));




// Route to display all donations
app.get('/donations', donationController.getAllDonations);

// Route to render the edit donation form
app.get('/donations/:id/edit', donationController.editDonationForm);

// Route to update a donation


app.get('/donations/add', donationController.emptyDonationForm);


app.post('/donations/submit', donationController.insertDonation)

app.post('/donations/:id', donationController.updateDonation);

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});