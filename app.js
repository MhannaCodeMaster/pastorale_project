const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const settingsRoute = require('./routes/settings');
const allBeneficiariesRoute = require('./routes/beneficiary_table');

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }));
app.use(csrfProtection);

// Set the CSRF token in res.locals
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Route for login and forgot password link
app.use(authRoute);

// Checking if the user has started a session
app.use((req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
});

app.use(settingsRoute);
app.use(allBeneficiariesRoute);
app.use(adminRoute);

// 404 error handling middleware
app.use((req, res, next) => {
  res.status(404).render('error404', { pageTitle: 'Page Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error500', { pageTitle: 'Server Error' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
