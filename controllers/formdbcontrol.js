
const insertModel=require('../models/formdb')
const selectModel=require('../models/edit')
const moment= require('moment')
function editForm(req,res){
    const benid=req.params.id
    console.log(benid)
    selectModel.selectMainBeni(benid).then(([mainbeni])=>{
        selectModel.selectMainHealth(benid).then(([healthes])=>{
            selectModel.selectRelation(benid,"joint").then(([joint])=>{
                console.log(joint[0].beneficiary2_id)
                selectModel.selectMainBeni(joint[0].beneficiary2_id).then(([joints])=>{
                    selectModel.selectMainHealth(joint[0].beneficiary2_id).then(([jointhealth])=>{

                                             insertModel.selectPropertyStatus().then(([property])=>{
                                                  insertModel.selectProffesionalStatus().then(([profesional])=>{
                                                        insertModel.selectSector().then(([sector])=>{
                                                                insertModel.selectSocialServices().then(([services])=>{
                                                                        insertModel.selectMedication().then(([medications])=>{
                                                                                insertModel.selectDisease().then(([disease])=>{
                                                                                        insertModel.selectFamilySituation().then(([family])=>{

        
                                                                                                 console.log(mainbeni[0].address_details)
                                                                                                res.render('../view/formedit',{
                                                                                                       mainbeni,moment,property,profesional,
                                                                                                       sector,services,medications,disease,
                                                                                                       family,healthes,joints,jointhealth
                                                                                                })
                                                                                })
                                                                        })
                                                                })
                                                        })
                                                   })
                                             })
                    })
                })
                }).catch((err)=>{
                    res.status(400).send("something went wrong 1")
                })
            }).catch((err)=>{
                res.status(400).send("something went wrong 1")
            })
        }).catch((err)=>{
            res.status(400).send("something went wrong 1")
        })
    }).catch((err)=>{
        res.status(400).send("something went wrong ")
    })

}
function updateForm(req,res){
    const beni_id=req.params.id
    const {fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprice,property_type,profesional_status,sectors,
        job_desc,job_address,job_salary,job_remark,health_service,health,medi,dis,buy,std,endt,comments,healthyremark,familysituation,numchildren}=req.body
        const rentprices =rentprice||null
        const job_descs=job_desc||null
        const job_addresss=job_address||null
        const job_salarys=job_salary||null
        const job_remarks=job_remark||null
        const sectorss=sectors||null
        console.log(fname)
    selectModel.updateData(fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprices,property_type,profesional_status,sectorss,
        job_descs,job_addresss,job_salarys,job_remarks,health_service,health,medi,dis,buy,std,endt,comments,healthyremark,familysituation,numchildren,beni_id).then(([updatebeni])=>{

        }).catch((err)=>{
            console.log(err)
            res.status(400).send("something went wrong")
        })
}
function insertInfo(req,res){

   const {fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprice,property_type,profesional_status,sectors,
    job_desc,job_address,job_salary,job_remark,health_service,health,medi,dis,buy,std,endt,comments,healthyremark,familysituation,numchildren,
    fname1,fathername1,lname1,phone1,date1,profesional_status1,sectors1,job_desc1,job_address1,job_salary1,job_remark1,health_service1,health1,medi1,dis1,
    buy1,std1,endt1,comments1,healthyremark1,monthly_gain,monthly_spend,price_of_rent,price_of_dish,price_of_internet_phone,price_of_cellulare,price_of_electricity,price_of_generator,price_of_loan,
    price_others,financial_remark}= req.body
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
   console.log(price_of_cellulare)
   console.log(req.body[`child${1}_FirstName`])
   console.log(req.body[`child${1}_comment`][1])
   


    console.log(req.body)
    insertModel.fillInformation(fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprices,property_type,profesional_status,sectorss,job_descs,job_addresss,job_salarys,job_remarks,health,health_service,healthyremark,familysituation,numchildren).then(([result])=>{
        for(let i=0;i<req.body.medi.length;i++){
            if(std[i]==""){
                continue
            }
            

            insertModel.fillHealthSituation(buy[i],std[i],endt[i],comments[i],dis[i],medi[i],result.insertId).then(([res])=>{
                
            }).catch((err)=>{
                console.log(err)
                res.status(400).send("something went wrong")
            })
        }
        for(let j=1;j<=req.body.numchildren;j++){
            const job_descs2=req.body[`child${j}_job_desc2`]||null
            const job_addresss2=req.body[`child${j}_job_address2`]||null
            const job_salarys2=req.body[`child${j}_job_salary2`]||null
            const job_remarks2=req.body[`child${j}_job_remark2`]||null
            const sectorss2=req.body[`child${j}_sectors2`]||null
            const stcls=req.body[`child${j}_class`]||null
            const estab=req.body[`child${j}_establishment`]||null
            const add=req.body[`child${j}_schoolAddress`]||null
            var rel="child"
            console.log(req.body[`child${j}_sectors2`])
            insertModel.fillInformation2(req.body[`child${j}_FirstName`],req.body[`child${j}_birthDate`],req.body[`child${j}_profesional_status3`],sectorss2,job_descs2,job_addresss2,job_salarys2,job_remarks2,req.body[`child${j}_healthes2`],req.body[`child${j}_health_service2`],req.body[`child${j}_healthyremark2`],stcls,estab,add).then(([wled])=>{
                insertModel.relationss(result.insertId,wled.insertId,rel).then(([rabbak])=>{

                }).catch((err)=>{
                    console.log(err)
                    res.status(400).send("relation")
                })
                console.log(wled.insertId)
                for(let i=0;i<req.body[`child${j}_medicationss`].length;i++){
                    console.log(req.body[`child${j}_comment`][i])
                    insertModel.fillHealthSituation1(req.body[`child${j}_toBuy`][i],req.body[`child${j}_startDate`][i],req.body[`child${j}_endDate`][i],req.body[`child${j}_comment`][i],req.body[`child${j}_diseasess`][i],req.body[`child${j}_medicationss`][i],wled.insertId).then((soheton)=>{

                    }).catch((err)=>{
                        console.log(err)
                        res.status(400).send("chi bel soha")
                    })
                   

                }

            }).catch((err)=>{
                console.log(err)
                res.status(400).send("something went wrong bel awleee")
            })
        }
        for(let j=1;j<=req.body.othersnumber;j++){
            const job_descs5=req.body[`other${j}_job_desc5`]||null
            const job_addresss5=req.body[`other${j}_job_address5`]||null
            const job_salarys5=req.body[`other${j}_job_salary5`]||null
            const job_remarks5=req.body[`other${j}_job_remark5`]||null
            const sectorss5=req.body[`other${j}_sectors5`]||null
            insertModel.fillInformation3(req.body[`other${j}_FirstName5`],req.body[`other${j}_FatherName5`],req.body[`other${j}_LastName5`],req.body[`other${j}_birthDate5`],req.body[`other${j}_profesional_status5`],sectorss5,job_descs5,job_addresss5,job_salarys5,job_remarks5,req.body[`other${j}_healthes5`],req.body[`other${j}_health_service5`],req.body[`other${j}_healthyremark5`]).then(([others])=>{
                insertModel.relationss(result.insertId,others.insertId,req.body[`other${j}_FamilyLink5`])
                for(let i=0;i<req.body[`other${j}_medicationss5`].length;i++){
                    insertModel.fillHealthSituation1(req.body[`other${j}_toBuy5`][i],req.body[`other${j}_startDate5`][i],req.body[`other${j}_endDate5`][i],req.body[`other${j}_comment5`][i],req.body[`other${j}_diseasess5`][i],req.body[`other${j}_medicationss5`][i],others.insertId).then(([sette])=>{

                    }).catch((err)=>{
                        console.log(err)
                        res.status(400).send("bi sohet el others")
                    })
                }

            }).catch((err)=>{
                console.log(err)
                res.status(400).send("bel others")
            })
        }
        
        insertModel.fillFinancialSituation(monthly_gain,monthly_spend,price_of_rent,price_of_dish,price_of_internet_phone,price_of_cellulare,price_of_electricity,price_of_generator,price_of_loan, price_others,financial_remark,result.insertId).then(([final])=>{
        }).catch((err)=>{
            console.log(err)
            res.status(400).send("something went wrong")
        })

     if(familysituation ==2){
        
    
        insertModel.fillInformation1(fname1,fathername1,lname1,phone1,date1,profesional_status1,sectorss1,job_descs1,job_addresss1,job_salarys1,job_remarks1,health1,health_service1,healthyremark1).then(([result1])=>{
            insertModel.insertRelation(result.insertId,result1.insertId,"conjoint")
           for(let i=0;i<req.body.medi1.length;i++){  
               if(std1[i]==""){
                   continue
                }
                insertModel.fillHealthSituation(buy1[i],std1[i],endt1[i],comments1[i],dis1[i],medi1[i],result1.insertId).then(([res1])=>{


                }).catch((err)=>{
                   console.log(err)
                   res.status(400).send("something went wrong")
                }) 
            }      

        }).catch((err)=>{
           console.log(err)
           res.status(400).send("something went wrong")
        })
    }
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

module.exports={insertInfo,getForm,getAllInformation,editForm,updateForm}
 