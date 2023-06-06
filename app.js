const express = require("express");
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
//const forms=require('./models/formdbcontrol')
const db = require('./util/database');
const insertModel=require('./models/formdb')
const formModel=require('./controllers/formdbcontrol')
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'view'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));
app.get('/form', (req, res) => {
   res.render('form');
  });
//app.post('/submit',forms.insertInfo)
app.post('/submit',(req,res)=>{
    const {FirstName,FatherName,LastName,Phone}= req.body
    console.log(req.body)
    const fname = FirstName|| null;
  const faname = FatherName || null;
  const lname = LastName || null;
  const phones = Phone || null;
    insertModel.fillInformation(fname,faname,lname,phones).then(({result})=>{
        console.log("data inserted")
        console.log(result)
    }).catch((err)=>{
        console.log(err)
        res.status(400).send("something went wrong")
    })
});
app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});
