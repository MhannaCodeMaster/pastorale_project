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
function updateData(FirstName,FatherName,LastName,Phone,date,ngadd,stadd,houseadd,housefloor,adddetails,price,propertyid,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,famsitu,childnum,beni_id){
    const query="UPDATE beneficiary SET first_name= ?,middle_name= ?,last_name= ?,phone_number= ?,birth_date= ?,neighborhood_address= ?,street_address= ?,house_address= ?,house_floor= ?,address_details= ?,price_of_rent= ?,property_status_id= ?,professional_status_id= ?,sector_id= ?,job_desc= ?,job_address= ?,job_salary= ?,job_remark= ?,social_service_remark= ?,hss_id= ?,health_remark= ?,family_situation_id= ?,number_of_children= ? WHERE b_id=?";
    return pool.execute(query,[FirstName,FatherName,LastName,Phone,date,ngadd,stadd,houseadd,housefloor,adddetails,price,propertyid,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,famsitu,childnum,beni_id])
}
module.exports={
    selectMainBeni,selectMainHealth,selectRelation,updateData
}