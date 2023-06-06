const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session')
const bodyParser = require('body-parser')
const formRoute =require('./routes/form')
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'view'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));
app.use(formRoute)
app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});
