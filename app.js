const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const settingsRoute = require('./routes/settings');

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'view')); // Set the views directory

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));

//Route for login and forgot password link
app.use(authRoute);

//Checking if the user have start a session
app.use((req, res, next)=>{
    if(!req.session.isLogged){
        res.redirect('/login');
    }
    else{
        next();
    }
})
app.use(settingsRoute);
app.use(adminRoute);

app.use((req,res,next)=>{
    res.status(404).render('error404',{pageTitle: 'Page Not Found'});
})

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});
