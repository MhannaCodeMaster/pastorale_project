const express=require('express')
const app=express()
app.get('/test',(req,res,next)=>{
    res.render('../view/test.ejs')
})
app.post('/test',(req,res,next)=>{
    

  console.log(req.body[`child${1}_name`])
  console.log(req.body)
    
})
module.exports=app