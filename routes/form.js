const express= require('express')
const app =express()
const formController =require("../controllers/formdbcontrol")
app.get('/form',formController.getForm)
app.post('/submit',formController.insertInfo)
module.exports=app