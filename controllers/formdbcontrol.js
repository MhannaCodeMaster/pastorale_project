
const insertModel=require('../models/formdb')
function insertInfo(req,res){

   const {fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprice,property_type,profesional_status,sectors,
    job_desc,job_address,job_salary,job_remark,health_service,health,medi,dis,buy,std,endt,comments,healthyremark,familysituation,numchildren,
    fname1,fathername1,lname1,phone1,date1,profesional_status1,sectors1,job_desc1,job_address1,job_salary1,job_remark1,health_service1,health1,medi1,dis1,
    buy1,std1,endt1,comments1,healthyremark1,fname2,date2,profesional_status2,cls,establishment,sch_Address,sectors2,job_desc2,job_address2,job_salary2,job_remark2,health_service2,health2,medi2,dis2,
    buy2,std2,endt2,comments2,healthyremark2}= req.body
   const rentprices =rentprice||null
   const job_descs=job_desc||null
   const job_addresss=job_address||null
   const job_salarys=job_salary||null
   const job_remarks=job_remark||null
   const sectorss=sectors||null
   const job_descs1=job_desc1||null
   const job_addresss1=job_address1||null
   const job_salarys1=job_salary1||null
   const job_remarks1=job_remark1||null
   const sectorss1=sectors1||null
   const job_descs2=job_desc2||null
   const job_addresss2=job_address2||null
   const job_salarys2=job_salary2||null
   const job_remarks2=job_remark2||null
   const sectorss2=sectors2||null
   const arr=[1,2]
   const len=arr.length
   console.log(len)
   

    console.log(req.body)
    insertModel.fillInformation(fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprices,property_type,profesional_status,sectorss,job_descs,job_addresss,job_salarys,job_remarks,health,health_service,healthyremark,familysituation,numchildren).then(([result])=>{
        for(let i=0;i<2;i++){
            console.log(buy[i])

            insertModel.fillHealthSituation(buy[i],std[i],endt[i],comments[i],dis[i],medi[i],result.insertId).then(([res])=>{
            }).catch((err)=>{
                console.log(err)
                res.status(400).send("something went wrong")
            })
        }
    }).catch((err)=>{
        console.log(err)
        res.status(400).send("something went wrong")
    })
    if(familysituation!=3){
        insertModel.fillInformation1(fname1,fathername1,lname1,phone1,date1,profesional_status1,sectorss1,job_descs1,job_addresss1,job_salarys1,job_remarks1,health1,health_service1,healthyremark1).then(([result1])=>{
           insertModel.fillHealthSituation(buy1,std1,endt1,comments1,dis1,medi1,result1.insertId).then(([res1])=>{

           }).catch((err)=>{
            console.log(err)
            res.status(400).send("something went wrong")
            })          
        }).catch((err)=>{
           console.log(err)
           res.status(400).send("something went wrong")
        })
    }

    insertModel.fillInformation2(fname2,date2,profesional_status2,sectorss2,job_descs2,job_addresss2,job_salarys2,job_remarks2,health2,health_service2,healthyremark2,cls,establishment,sch_Address).then(([result2])=>{
        insertModel.fillHealthSituation(buy2,std2,endt2,comments2,dis2,medi2,result2.insertId).then(([res])=>{

        }).catch((err)=>{
            console.log(err)
            res.status(400).send("something went wrong")
        })  
    }).catch((err)=>{
        console.log(err)
        res.status(400).send("something went wrong")
   })

}
function getAllInformation(req,res){
    insertModel.selectPropertyStatus().then(([property])=>{
        insertModel.selectProffesionalStatus().then(([profesional])=>{
            insertModel.selectSector().then(([sector])=>{
                insertModel.selectSocialServices().then(([services])=>{
                    insertModel.selectMedication().then(([medications])=>{
                        insertModel.selectDisease().then(([disease])=>{
                            insertModel.selectFamilySituation().then(([family])=>{
                               res.render('../view/form.ejs',{
                                 property:property,
                                 profesional:profesional,
                                 sector:sector,
                                 services:services,
                                 medications:medications,
                                 disease:disease,
                                 family:family
                                })
                            }).catch((err)=>{
                                res.status(400).send("something went wrong")
                            })
                        }).catch((err)=>{
                            res.status(400).send("something went wrong")
                        })
                    }).catch((err)=>{
                        res.status(400).send("something went wrong")
                    })
               }).catch((err)=>{
                res.status(400).send("something went wrong")
               })
            }).catch((err)=>{
                res.status(400).send("something went wrong")
            })
        }).catch((err)=>{
           res.status(400).send("something went wrong")
        })
    }).catch((err)=>{
        res.status(400).send("something went wrong") 
    })
}
function getForm(req,res){
    res.render('../view/form.ejs')

}
module.exports={insertInfo,getForm,getAllInformation}
