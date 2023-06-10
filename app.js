const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./util/database');
const donationRoute = require('./routes/donations')

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));
app.use(donationRoute)





app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});