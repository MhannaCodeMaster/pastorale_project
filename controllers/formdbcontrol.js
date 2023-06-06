const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const insertModel=require('../models/formdb')
function insertInfo(req,res){
   const {fname,fathername,lname,phone}= req
    //console.log(req.body)
    console.log(req)
    insertModel.fillInformation(fname,fathername,lname,phone).then(([result])=>{
        console.log("data inserted")
        console.log(result)
    }).catch((err)=>{
        console.log(err)
        res.status(400).send("something went wrong")
    })
}
module.exports={insertInfo,}
