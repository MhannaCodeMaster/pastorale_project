const express= require('express')
const app =express()
const formController =require("../controllers/formdbcontrol")
app.get('/form',formController.getAllInformation)
app.post('/submit',formController.insertInfo)
module.exports=app
