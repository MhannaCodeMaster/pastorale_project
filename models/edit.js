const pool=require('../util/database')
function selectMainBeni(beni_id){
    const query="SELECT * FROM beneficiary WHERE b_id= ?"
    return pool.execute(query,[beni_id])
}
function selectMainHealth(beni_id){
    const query="SELECT * FROM health_situation WHERE beneficiary_id= ?"
    return pool.execute(query,[beni_id])
}
function selectRelation(beni_id,relation){
    const query="SELECT * FROM beneficiar_relation WHERE beneficiary1_id= ? AND relation_desc= ?"
    return pool.execute(query,[beni_id,relation])
}

function other(first,second,beni){
    const query='SELECT * FROM beneficiar_relation WHERE relation_desc NOT IN (?, ?) AND beneficiary1_id = ?';
    return pool.execute(query,[first,second,beni])
}
function financial(beni_id){
    const query='SELECT * FROM financial_situation WHERE beni_id=?'
    return pool.execute(query,[beni_id])
}
function updatemain(FirstName,FatherName,LastName,Phone,date,ngadd,stadd,houseadd,housefloor,adddetails,price,propertyid,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,famsitu,childnum,healthother,profother,interview_date,interview_location,interviewer_id,benid){
    const query='UPDATE beneficiary SET first_name= ?,middle_name =?,last_name =?,phone_number =?,birth_date =?,neighborhood_address =?,street_address =?,house_address =?,house_floor =?,address_details =?,price_of_rent =?,property_status_id = ?,professional_status_id =?,sector_id =?,job_desc =?,job_address =?,job_salary=?,job_remark=?,social_service_remark =?,hss_id =?,health_remark =?,family_situation_id =?,number_of_children =?,health_service_other =?,profesional_status_other=?,interview_date=?,interview_location=?,interviewer_id=? WHERE b_id= ?'
    return pool.execute(query,[FirstName,FatherName,LastName,Phone,date,ngadd,stadd,houseadd,housefloor,adddetails,price,propertyid,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,famsitu,childnum,healthother,profother,interview_date,interview_location,interviewer_id,benid])
}
function deleteMainHealth200(beni_id){
    const query= 'DELETE FROM health_situation  WHERE beneficiary_id = ?'
    return pool.execute(query,[beni_id])
}

function deleteChilds(childsid){
    const query='DELETE FROM beneficiary WHERE b_id=?;'
    return pool.execute(query,[childsid])

}
function deleteRel(beni_id,rel){
    const query='DELETE FROM beneficiar_relation WHERE beneficiary1_id=? AND relation_desc=?'
    return pool.execute(query,[beni_id,rel])
}
function updatefinancial(monthly_gains,monthly_spends,price_of_rents,price_of_dishs,price_of_internet_phones,price_of_cellulares,price_of_electricitys,price_of_generators,price_of_loans,price_otherss,remarks,benid){
    const query='UPDATE financial_situation SET monthly_gain =?,monthly_spend =?,price_of_rent =?,price_of_dish =?,price_of_internet_phone =?,price_of_cellular =?,price_of_electricity =?,price_of_generator =?,price_of_loan =?,price_others =?,remark =? WHERE beni_id= ?'
    return pool.execute(query,[monthly_gains,monthly_spends,price_of_rents,price_of_dishs,price_of_internet_phones,price_of_cellulares,price_of_electricitys,price_of_generators,price_of_loans,price_otherss,remarks,benid])
}
function updateChildrens(FirstName,beni_id){
    const query='UPDATE beneficiary SET first_name= ? WHERE b_id= ?'
    return pool.execute(query,[FirstName,beni_id])
}
function fillInformatio(FirstName,date,profstatid,secid,jobdesc,jobadd,job_sal,jobrem,social_service_remark,hss_id,hremark,Cls,Establishment,School_address,healthother,profother,mainbeni){
    const query=`INSERT INTO beneficiary (first_name,birth_date,professional_status_id,sector_id,job_desc,job_address,job_salary,job_remark,social_service_remark,hss_id,health_remark,class,establishment,school_address,health_service_other,profesional_status_other,main_beneficiary) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return pool.execute(query,[FirstName,date,profstatid,secid,jobdesc,jobadd,job_sal,jobrem,social_service_remark,hss_id,hremark,Cls,Establishment,School_address,healthother,profother,mainbeni])
}
function fillInfor(FirstName,FatherName,LastName,date,profstatid,secid,jobdesc,jobsal,jobadd,jobrem,social_service_remark,hss_id,hremark,healthother,profother,mainbeni,fam){
    const query=`INSERT INTO beneficiary (first_name,middle_name,last_name,birth_date,professional_status_id,sector_id,job_desc,job_address,job_salary,job_remark,social_service_remark,hss_id,health_remark,health_service_other,profesional_status_other,main_beneficiary,Family_link) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return pool.execute(query,[FirstName,FatherName,LastName,date,profstatid,secid,jobdesc,jobsal,jobadd,jobrem,social_service_remark,hss_id,hremark,healthother,profother,mainbeni,fam])
}
function selectdecisions(benid){
    const query="SELECT * FROM decision WHERE beneficiary_id= ?"
    return pool.execute(query,[benid])
}
function updatejoint(FirstName,FatherName,LastName,Phone,date,profstatid,secid,jobdesc,jobadd,jobrem,social_service_remark,hss_id,hremark,healthother,profother,benid){
    const query='UPDATE beneficiary SET first_name= ?,middle_name =?,last_name =?,phone_number =?,birth_date =?,professional_status_id =?,sector_id =?,job_desc =?,job_address =?,job_remark=?,social_service_remark =?,hss_id =?,health_remark =?,health_service_other =?,profesional_status_other=? WHERE b_id= ?'
    return pool.execute(query,[FirstName,FatherName,LastName,Phone,date,profstatid,secid,jobdesc,jobadd,jobrem,social_service_remark,hss_id,hremark,healthother,profother,benid])
}
function deleteDec(beni_id){
    const query='DELETE FROM decision WHERE beneficiary_id=?'
    return pool.execute(query,[beni_id])
}


module.exports={
    selectMainBeni,selectMainHealth,selectRelation,other,financial,updatemain,updatefinancial,updateChildrens,deleteChilds,fillInformatio,deleteRel,fillInfor,selectdecisions,updatejoint,deleteDec,deleteMainHealth200
}