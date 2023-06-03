const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
//const db = require('./util/database');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));


app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});
