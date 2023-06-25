const express= require('express')
const app =express()
const formController =require("../controllers/formdbcontrol")
app.get('/form',formController.getAllInformation)
app.get('/form/edit/:id',formController.editForm)
app.post('/form',formController.insertInfo)
app.post('/form/edit/:id',formController.updateForm)

module.exports=app
