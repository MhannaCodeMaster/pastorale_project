const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session')
const bodyParser = require('body-parser')
// const csrf = require('csurf');
//const csrfProtection = csrf();

//Routes
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const settingsRoute = require('./routes/settings');
const allBeneficiariesRoute = require('./routes/beneficiary_table');
const formRoute =require('./routes/form')
const exportRoute = require('./routes/exportRoute')
const donationRoute = require('./routes/donations')


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));
app.set('views', path.join(__dirname, 'view'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

// app.use(csrfProtection);

// Set the CSRF token in res.locals
// app.use((req, res, next) => {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });


// Route for login and forgot password link
app.use(authRoute);

//Error 500 middlerware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error500', { pageTitle: 'Server Error',mg:'' });
});

// Checking if the user has started a session
app.use((req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
});

app.use(formRoute);
app.use(settingsRoute);
app.use(allBeneficiariesRoute);
app.use(adminRoute);
app.use(donationRoute);
app.use(exportRoute);


//Part 2

/*----------ROUTES------------*/
const account = require("./routes_part2/account/route")
const activities = require("./routes_part2/activities/route")
const medicine = require("./routes_part2/medicine/route")
const exportt = require("./routes_part2/export/route")

app.use("/account", account)

app.use("/activities", activities)

app.use("/medicine",  medicine)

app.use("/export/part2", [express.static("./routes_part2/export"), exportt])


//Error 500 middlerware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error500', { pageTitle: 'Server Error' });
});

// 404 error handling middleware
app.use((req, res, next) => {
  res.status(404).render('error404', { pageTitle: 'Page Not Found' });
});

app.listen(4000, () => {
  console.log('Server listening on port 3000');
});
