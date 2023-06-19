const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session')
const bodyParser = require('body-parser')
const formRoute =require('./routes/form')
const testing=require('./routes/test')
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'view'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));
app.use(formRoute)
app.use(testing)
app.listen(4000,()=>{
    console.log('Server listening on port 4000');
});
