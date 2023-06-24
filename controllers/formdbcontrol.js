
const insertModel=require('../models/formdb')
const selectModel=require('../models/edit')
const moment= require('moment')
function editForm(req,res){
    const benid=req.params.id
    const children=[]
    const healthCare=[]
    const members =[]
    const decisions=[]
    const healthO=[]
    const aidid=[]
    
 
  selectModel.financial(benid).then(([masare])=>{
    
    selectModel.selectMainBeni(benid).then(([mainbeni])=>{
        selectModel.selectMainHealth(benid).then(([healthes])=>{
            selectModel.selectRelation(benid,"joint").then(([joint])=>{
                selectModel.selectMainBeni(joint[0].beneficiary2_id).then(([joints])=>{
                    selectModel.selectMainHealth(joint[0].beneficiary2_id).then(([jointhealth])=>{
                        selectModel.selectRelation(benid,"child").then(([child])=>{
                            if(child.length>0){
                              child.forEach(childs =>{                          
                                selectModel.selectMainBeni(childs.beneficiary2_id).then(([childs])=>{
                                   children.push(childs)

                                })
                                 selectModel.selectMainHealth(childs.beneficiary2_id).then(([mom])=>{
                                    healthCare.push(mom);                
                                })
                             })
                            }
                            selectModel.selectRelation(benid,"other").then(([othersss])=>{
                            othersss.forEach(oo =>{
                                selectModel.selectMainBeni(oo.beneficiary2_id).then(([otherss])=>{
                                    members.push(otherss)
                                })
                                selectModel.selectMainHealth(oo.beneficiary2_id).then(([dad])=>{
                                    healthO.push(dad)

                                })
                            })
                            
                         })
                         selectModel.selectdecisions(benid).then(([deci])=>{
                            deci.forEach(d=>{
                                aidid.push(d.aid_id)
                            })

                                
                         

                                             insertModel.selectPropertyStatus().then(([property])=>{
                                                  insertModel.selectProffesionalStatus().then(([profesional])=>{
                                                        insertModel.selectSector().then(([sector])=>{
                                                                insertModel.selectSocialServices().then(([services])=>{
                                                                        insertModel.selectMedication().then(([medications])=>{
                                                                                insertModel.selectDisease().then(([disease])=>{
                                                                                        insertModel.selectFamilySituation().then(([family])=>{
                                                                                            insertModel.selectDecision().then(([decision])=>{
                                                                                                insertModel.SelectUser().then(([users])=>{

                                                                                            console.log(healthCare)
                                                                                                res.render('../view/formedit',{
                                                                                                       mainbeni,moment,property,profesional,
                                                                                                       sector,services,medications,disease,
                                                                                                       family,healthes,joints,jointhealth,children,healthCare,members,masare,decision,deci,healthO,aidid,users
                                                                                                })
                                                                                            })
                                                                                         })
                                                                                        })
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
 }).catch((err)=>{
    res.status(400).send("masare ")
})


}
function updateForm(req,res){
    const beni_id=req.params.id
    const {fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprice,property_type,profesional_status,sectors,
        job_desc,job_address,job_salary,job_remark,health_service,health,medi,dis,buy,std,endt,comments,healthyremark,familysituation,numchildren,monthly_gain,monthly_spend,price_of_rent,price_of_dish,price_of_internet_phone,price_of_cellulare,price_of_electricity,price_of_generator,price_of_loan,
        price_others,financial_remark,fname1,fathername1,lname1,phone1,date1,profesional_status1,sectors1,job_desc1,job_address1,job_salary1,job_remark1,health_service1,health1,medi1,dis1,
        buy1,std1,endt1,comments1,healthyremark1,profesional_status_other,health_service_other,date_interview,interviewer,place_interview,profesional_status_other1,health_service_other1}=req.body
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
        const health_service_others=health_service_other || null
        const profesional_status_others=profesional_status_other || null
        const health_service_others1=health_service_other1 || null
        const profesional_status_others1=profesional_status_other1 || null
        const medio=req.body.medi.length
        let len=0
        
        const rel1="child"
        const rel2="joint"
        const rel3="other"
        console.log(req.body)
        selectModel.updatemain(fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprices,property_type,profesional_status,sectorss,job_descs,job_addresss,job_salarys,job_remarks,health,health_service,healthyremark,familysituation,numchildren,health_service_others,profesional_status_others,date_interview,place_interview,interviewer,beni_id).then(([updated])=>{

        }).catch((err)=>{
            console.log(err)
            res.status(400).send("bel update")
        })
        
            for(let i=1;i<medio;i++){
               
                    // console.log(buy[i])
                    // console.log(std[i])
                    // console.log(endt[i])
                    // console.log(comments[i])
                    // console.log(dis[i])
                    // console.log(medi[i])
                    console.log(req.body.buy)
                    selectModel.deleteMainHealth1(beni_id).then(([ostphen])=>{
                      insertModel.fillHealthSituation(buy[i],std[i],endt[i],comments[i],dis[i],medi[i],beni_id).then(([res])=>{
                
                      }).catch((err)=>{
                         console.log(err)
                         res.status(400).send("something went wrong")
                      })
                    }).catch((err)=>{
                        console.log(err)
                         res.status(400).send("something went wrong bel delte")
                    })
                
               
            }
            selectModel.selectRelation(beni_id,"joint").then(([joint])=>{
                selectModel.updatejoint(fname1,fathername1,lname1,phone1,date1,profesional_status1,sectorss1,job_descs1,job_addresss1,job_remarks1,health1,health_service1,healthyremark1,health_service_other1,profesional_status_other1,joint[0].beneficiary2_id).then(([res3])=>{

                }).catch((err)=>{
                        console.log(err)
                         res.status(400).send("something went wrong bel update")
                    })
    
            
            for(let i=1;i<req.body.medi1.length;i++){
                // console.log(buy[i])
                // console.log(std[i])
                // console.log(endt[i])
                // console.log(comments[i])
                // console.log(dis[i])
                // console.log(medi[i])
                
                selectModel.deleteMainHealth1(joint[0].beneficiary2_id).then(([ostphen])=>{
                  insertModel.fillHealthSituation(buy1[i],std1[i],endt1[i],comments1[i],dis1[i],medi1[i],joint[0].beneficiary2_id).then(([res])=>{
            
                  }).catch((err)=>{
                     console.log(err)
                     res.status(400).send("something went wrong")
                  })
                }).catch((err)=>{
                    console.log(err)
                     res.status(400).send("something went wrong bel delte")
                })
            }
        })
        if(numchildren>0){

            selectModel.selectRelation(beni_id,"child").then(([wled1])=>{
                wled1.forEach(w =>{
                    selectModel.deleteChilds(w.beneficiary2_id).then(([res2])=>{

                    }).catch((err)=>{
                        console.log(err)
                         res.status(400).send("something went wrong bi tedlit el wled")
                    })
                })
            })
            selectModel.deleteRel(beni_id,rel1).then(([ros])=>{

            })
            for(let j=1;j<=req.body.numchildren;j++){
                const job_descs2=req.body[`job_desc2_${j}`]||null
                const job_addresss2=req.body[`job_address2_${j}`]||null
                const job_salarys112=req.body[`job_salary11_${j}`]||null
                const job_remarks2=req.body[`job_remark2_${j}`]||null
                const sectorss2=req.body[`sectors2_${j}`]||null
                const stcls=req.body[`cls_${j}`]||null
                const estab=req.body[`establishment_${j}`]||null
                const add=req.body[`sch_Address_${j}`]||null
                const healo=req.body[`health_service_other2_${j}`]||null
                const prof=req.body[`profesional_status_other2_${j}`]||null

                selectModel.fillInformatio(req.body[`FirstName_${j}`], req.body[`BirthDate_${j}`],req.body[`profesional_status3_${j}`],sectorss2,job_descs2,job_addresss2,job_salarys112,job_remarks2,req.body[`healthes2_${j}`],req.body[`health_service1_${j}`],req.body[`healthyremark2_${j}`],stcls,estab,add,healo,prof,"no").then(([wlod])=>{
                    insertModel.relationss(beni_id,wlod.insertId,rel1).then(([res1])=>{

                    }).catch((err)=>{
                        console.log(err)
                        res.status(400).send("bel fin")
                    })
                   

                    

                }).catch((err)=>{
                 console.log(err)
                 res.status(400).send("bel insert child")
                })

            }
        }
            selectModel.selectRelation(beni_id,"other").then(([otherss])=>{
                otherss.forEach((o,index) =>{
                    selectModel.deleteChilds(o.beneficiary2_id).then(([res2])=>{

                    }).catch((err)=>{
                        console.log(err)
                         res.status(400).send("something went wrong bi tedlit el other")
                    })
                    selectModel.deleteMainHealth1(o.beneficiary2_id).then(([healdelete])=>{

                    }).catch((err)=>{
                        console.log(err)
                         res.status(400).send("something went wrong bi tedlit el other")
                    })
                    len=index
                
                })
                
            })
            selectModel.deleteRel(beni_id,rel3).then(([ros])=>{

            })
            
            console.log(len)
            if(len>0){
            for(let j=1;j<=len+1;j++){
                const job_descs5=req.body[`job_desc5_${j}`]||null
                const job_addresss5=req.body[`job_address5_${j}`]||null
                const job_salarys10=req.body[`job_salary5_${j}`]||null
                const job_remarks5=req.body[`job_remark5_${j}`]||null
                const sectorss5=req.body[`sectors5_${j}`]||null
                const healo1=req.body[`health_service_other3_${j}`]||null
                const prof1=req.body[`profesional_status_other3_${j}`]||null
                selectModel.fillInfor(req.body[`FirstName5_${j}`],req.body[`FatherName5_${j}`],req.body[`LastName5_${j}`],req.body[`BirthDate5_${j}`],req.body[`profesional_status5_${j}`],sectorss5,job_descs5,job_addresss5,job_salarys10,job_remarks5,req.body[`healthes5_${j}`],req.body[`health_service5_${j}`],req.body[`healthyremark5_${j}`],healo1,prof1,"no",req.body[`FamilyLink5_${j}`]).then(([chilll])=>{
                    insertModel.relationss(beni_id,chilll.insertId,"other").then(([relo])=>{

                    })
                    for(let i=0;i<req.body[`medicationss5_${j}`].length;i++){
                        insertModel.fillHealthSituation1(req.body[`toBuy5_${j}`][i],req.body[`startDate5_${j}`][i],req.body[`endDate5_${j}`][i],req.body[`comment5_${j}`][i],req.body[`diseasess5_${j}`][i],req.body[`medicationss5_${j}`][i],chilll.insertId).then(([sette])=>{
    
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
            }

            selectModel.updatefinancial(monthly_gain,monthly_spend,price_of_rent,price_of_dish,price_of_internet_phone,price_of_cellulare,price_of_electricity,price_of_generator,price_of_loan,
                price_others,financial_remark,beni_id).then(([ress])=>{

            }).catch((err)=>{
                 console.log(err)
                 res.status(400).send("bel fin")
            })
            selectModel.deleteDec(beni_id).then(([deldec])=>{

            })
            const fin=req.body.Financial_decision || null
     const sch=req.body.Scholar || null
     const oth=req.body.other_decision || null


     for(let i=0;i<req.body.decision.length;i++){
         insertModel.insertDecision(req.body.Decision_remark,req.body.decision[i],beni_id,fin,sch,oth).then(([decisio])=>{

         }).catch((err)=>{
       console.log(err)
       res.status(400).send("something went wrong bel decision")
    })
     }

            
            
}
function insertInfo(req,res){

   const {fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprice,property_type,profesional_status,sectors,
    job_desc,job_address,job_salary,job_remark,health_service,health,medi,dis,buy,std,endt,comments,healthyremark,familysituation,numchildren,
    fname1,fathername1,lname1,phone1,date1,profesional_status1,sectors1,job_desc1,job_address1,job_salary1,job_remark1,health_service1,health1,medi1,dis1,
    buy1,std1,endt1,comments1,healthyremark1,monthly_gain,monthly_spend,price_of_rent,price_of_dish,price_of_internet_phone,price_of_cellulare,price_of_electricity,price_of_generator,price_of_loan,
    price_others,financial_remark,health_service_other,profesional_status_other,date_interview,interviewer,place_interview,health_service_other1,profesional_status_other1}= req.body
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
   const numchilds=numchildren || null
   const health_service_others=health_service_other || null
   const profesional_status_others=profesional_status_other || null
   const health_service_others1=health_service_other1 || null
   const profesional_status_others1=profesional_status_other1 || null
   
   
                   

    console.log(req.body)
    insertModel.fillInformation(fname,fathername,lname,phone,date,neighborhood,street,buildiing,Floor,additionalinfo,rentprices,property_type,profesional_status,sectorss,job_descs,job_addresss,job_salarys,job_remarks,health,health_service,healthyremark,familysituation,numchilds,health_service_others,profesional_status_others,"yes",interviewer,date_interview,place_interview).then(([result])=>{
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
            const health_service_others2=req.body[`child${j}_health_service_other2`] || null
            const profesional_status_others2=req.body[`child${j}_profesional_status_other2`] || null

            var rel="child"
           
            insertModel.fillInformation2(req.body[`child${j}_FirstName`],req.body[`child${j}_birthDate`],req.body[`child${j}_profesional_status3`],sectorss2,job_descs2,job_addresss2,job_salarys2,job_remarks2,req.body[`child${j}_healthes2`],req.body[`child${j}_health_service2`],req.body[`child${j}_healthyremark2`],stcls,estab,add,health_service_others2,profesional_status_others2,"no").then(([wled])=>{
                insertModel.relationss(result.insertId,wled.insertId,"child").then(([chillll])=>{

                }).catch((err)=>{
                    console.log(err)
                    res.status(400).send("relation chil")
                })
                
                for(let i=0;i<req.body[`child${j}_medicationss`].length;i++){
                    if(req.body[`child${j}_startDate`][i]==""){
                        continue
                     }
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
            const health_service_others3=req.body[`other${j}_health_service_other3`] || null
            const profesional_status_others3=req.body[`other${j}_profesional_status_other3`] || null
            insertModel.fillInformation3(req.body[`other${j}_FirstName5`],req.body[`other${j}_FatherName5`],req.body[`other${j}_LastName5`],req.body[`other${j}_birthDate5`],req.body[`other${j}_profesional_status5`],sectorss5,job_descs5,job_addresss5,job_salarys5,job_remarks5,req.body[`other${j}_healthes5`],req.body[`other${j}_health_service5`],req.body[`other${j}_healthyremark5`],health_service_others3,profesional_status_others3,"no",req.body[`other${j}_FamilyLink5`]).then(([others])=>{
                insertModel.relationss(result.insertId,others.insertId,"other").then(([childo])=>{
                    
                })
                for(let i=0;i<req.body[`other${j}_medicationss5`].length;i++){
                    if(req.body[`other${j}_startDate5`][i]==""){
                        continue
                     }
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

      if(familysituation == 2 ){
        
    
        insertModel.fillInformation1(fname1,fathername1,lname1,phone1,date1,profesional_status1,sectorss1,job_descs1,job_addresss1,job_salarys1,job_remarks1,health1,health_service1,healthyremark1,health_service_others1,profesional_status_others1,"no").then(([result1])=>{
            insertModel.relationss(result.insertId,result1.insertId,"joint").then(([jointi])=>{

            }).catch((err)=>{
                console.log(err)
                res.status(400).send("relation")
            })
            
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
           res.status(400).send("something went wrong bel joint")
        })
     }
     const fin=req.body.Financial_decision || null
     const sch=req.body.Scholar || null
     const oth=req.body.other_decision || null


     for(let i=0;i<req.body.decision.length;i++){
         insertModel.insertDecision(req.body.Decision_remark,req.body.decision[i],result.insertId,fin,sch,oth).then(([decisio])=>{

         }).catch((err)=>{
       console.log(err)
       res.status(400).send("something went wrong bel decision")
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
                                insertModel.selectDecision().then(([decision])=>{
                                    insertModel.SelectUser().then(([users])=>{

                                    
                                     res.render('../view/form.ejs',{
                                         property:property,
                                         profesional:profesional,
                                         sector:sector,
                                         services:services,
                                         medications:medications,
                                         disease:disease,
                                         family:family,
                                         decision:decision,
                                         users:users
                                      })
                                    })
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
 