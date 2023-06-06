
const insertModel=require('../models/formdb')
function insertInfo(req,res){
   const {fname,fathername,lname,phone}= req.body
    console.log(fname)
    console.log(req.body)
    insertModel.fillInformation(fname,fathername,lname,phone).then(([result])=>{
        console.log("data inserted")
        console.log(result)
    }).catch((err)=>{
        console.log(err)
        res.status(400).send("something went wrong")
    })
}
function getForm(req,res){
    res.render('../view/form.ejs')

}
module.exports={insertInfo,getForm,}
