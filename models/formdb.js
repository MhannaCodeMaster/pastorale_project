const pool=require('../util/database')

function fillInformation(FirstName,FatherName,LastName,Phone,date,ngadd,stadd,houseadd,housefloor,adddetails,price,propertyid,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,famsitu,childnum,healthother,profother,mainbeni,inerviewer,dateinterview,placeinter){
    const query=`INSERT INTO beneficiary (first_name,middle_name,last_name,phone_number,birth_date,neighborhood_address,street_address,house_address,house_floor,address_details,price_of_rent,property_status_id,professional_status_id,sector_id,job_desc,job_address,job_salary,job_remark,social_service_remark,hss_id,health_remark,family_situation_id,number_of_children,health_service_other,profesional_status_other,main_beneficiary,interviewer_id,interview_date,interview_location) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return pool.execute(query,[FirstName,FatherName,LastName,Phone,date,ngadd,stadd,houseadd,housefloor,adddetails,price,propertyid,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,famsitu,childnum,healthother,profother,mainbeni,inerviewer,dateinterview,placeinter])
}
function fillInformation1(FirstName,FatherName,LastName,Phone,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,healthother,profother,mainbeni){
    const query=`INSERT INTO beneficiary (first_name,middle_name,last_name,phone_number,birth_date,professional_status_id,sector_id,job_desc,job_address,job_salary,job_remark,social_service_remark,hss_id,health_remark,health_service_other,profesional_status_other,main_beneficiary) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return pool.execute(query,[FirstName,FatherName,LastName,Phone,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,healthother,profother,mainbeni])
}
//function fillInformation2(FirstName,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,Cls,Establishment,School_address){
   // const query=`INSERT INTO beneficiary (first_name,birth_date,professional_status_id,sector_id,job_desc,job_address,job_salary,job_remark,social_service_remark,hss_id,health_remark,class,establishment,school_address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
   // return pool.execute(query,[FirstName,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,Cls,Establishment,School_address])
//}
function fillInformation2(FirstName,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,Cls,Establishment,School_address,healthother,profother,mainbeni){
    const query=`INSERT INTO beneficiary (first_name,birth_date,professional_status_id,sector_id,job_desc,job_address,job_salary,job_remark,social_service_remark,hss_id,health_remark,class,establishment,school_address,health_service_other,profesional_status_other,main_beneficiary) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return pool.execute(query,[FirstName,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,Cls,Establishment,School_address,healthother,profother,mainbeni])
}
// function insertRelation(benid1,benid2,relation){
//     const query=`INSERT INTO beneficiar_relation (beneficiary1_id,beneficiary2_id,relation_desc,) VALUES(?,?,?)`;
//     return pool.execute(query,[benid1,benid2,relation])
// }
function fillInformation3(FirstName,FatherName,LastName,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,healthother,profother,mainbeni,fam){
    const query=`INSERT INTO beneficiary (first_name,middle_name,last_name,birth_date,professional_status_id,sector_id,job_desc,job_address,job_salary,job_remark,social_service_remark,hss_id,health_remark,health_service_other,profesional_status_other,main_beneficiary,Family_link) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return pool.execute(query,[FirstName,FatherName,LastName,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,healthother,profother,mainbeni,fam])
}
function relationss(beni1,beni2,rels){
    const query=`INSERT INTO beneficiar_relation (beneficiary1_id,beneficiary2_id,relation_desc) VALUES(?,?,?)`;
    return pool.execute(query,[beni1,beni2,rels])
}
function selectPropertyStatus(){
    const query="SELECT * FROM property_status"
    return pool.execute(query)
}
function fillHealthSituation(buys,startd,enddt,com,diseases,medicines,ben){
    const query=`INSERT INTO health_situation (bought,start_date,end_date,remark,disease_id,medicine_id,beneficiary_id) VALUES (?,?,?,?,?,?,?)`;
    return pool.execute(query,[buys,startd,enddt,com,diseases,medicines,ben])
}
function fillHealthSituation1(buys,startd,enddt,com,diseases,medicines,ben){
    const query=`INSERT INTO health_situation (bought,start_date,end_date,remark,disease_id,medicine_id,beneficiary_id) VALUES (?,?,?,?,?,?,?)`;
    return pool.execute(query,[buys,startd,enddt,com,diseases,medicines,ben])
}
function selectProffesionalStatus(){
    const query="SELECT * FROM professional_status"
    return pool.execute(query)
}
function selectSector(){
    const query="SELECT * FROM sector"
    return pool.execute(query)
}
function selectSocialServices(){
    const query="SELECT * FROM health_social_services"
    return pool.execute(query)
}
function selectMedication(){
    const query="SELECT * FROM medication"
    return pool.execute(query)
}
function selectDisease(){
    const query="SELECT * FROM disease"
    return pool.execute(query)
}
function selectFamilySituation(){
    const query="SELECT * FROM family_situation"
    return pool.execute(query)
}
function fillFinancialSituation(monthly_gains,monthly_spends,price_of_rents,price_of_dishs,price_of_internet_phones,price_of_cellulares,price_of_electricitys,price_of_generators,price_of_loans,price_otherss,remarks,beni_id){
    const query="INSERT INTO financial_situation (monthly_gain,monthly_spend,price_of_rent,price_of_dish,price_of_internet_phone,price_of_cellular,price_of_electricity,price_of_generator,price_of_loan,price_others,remark,beni_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
    return pool.execute(query,[monthly_gains,monthly_spends,price_of_rents,price_of_dishs,price_of_internet_phones,price_of_cellulares,price_of_electricitys,price_of_generators,price_of_loans,price_otherss,remarks,beni_id])
}
function selectDecision(){
    const query="SELECT * FROM aid_type"
    return pool.execute(query)
}
function insertDecision(remark,aid_id,beni_id,Financial,Scolaire,other){
    const query="INSERT INTO decision (remark,aid_id,beneficiary_id,Financial_decision,Scolaire_Decision,other_decison) VALUES (?,?,?,?,?,?)"
    return pool.execute(query,[remark,aid_id,beni_id,Financial,Scolaire,other])
}
function SelectUser(){
    const query ='SELECT * FROM users'
    return pool.execute(query)
}

module.exports = {
    fillInformation,
    selectPropertyStatus,
    selectProffesionalStatus,selectSector,
    selectSocialServices,
    selectMedication,
    selectDisease,
    selectFamilySituation,
    fillHealthSituation,
    fillInformation1,
    fillInformation2,
    fillFinancialSituation,
    fillHealthSituation1,
    relationss,
    fillInformation3,selectDecision,insertDecision,SelectUser
}
