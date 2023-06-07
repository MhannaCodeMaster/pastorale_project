
const insertModel=require('../models/formdb')
function insertInfo(req,res){
   const {fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprice,property_type}= req.body

    console.log(req.body)
    insertModel.fillInformation(fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprice,property_type).then(([result])=>{
        console.log("data inserted")
        console.log(result)
    }).catch((err)=>{
        console.log(err)
        res.status(400).send("something went wrong")
    })
}
function getAllInformation(req,res){
    insertModel.selectPropertyStatus().then(([property])=>{
        console.log(property)
        res.render('../view/form.ejs',{
            property:property
        })
    }).catch((err)=>{
        res.status(400).send("something went wrong")
    })
}
function getForm(req,res){
    res.render('../view/form.ejs')

}
module.exports={insertInfo,getForm,getAllInformation}
