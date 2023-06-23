const express = require('express');
const app = express();

app.get('/test',(req,res,next)=>{
    res.render('../view/test.ejs',{pageTitle: 'Testing'});
});
app.post('/test',(req,res,next)=>{
    const childData = req.body;
    console.log(childData);
});

module.exports = app;