const pool=require('../util/database')

function fillInformation(FirstName,FatherName,LastName,Phone,date,ngadd,stadd,houseadd,housefloor,adddetails,price,propertyid,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,famsitu,childnum){
    const query=`INSERT INTO beneficiary (first_name,middle_name,last_name,phone_number,birth_date,neighborhood_address,street_address,house_address,house_floor,address_details,price_of_rent,property_status_id,professional_status_id,sector_id,job_desc,job_address,job_salary,job_remark,social_service_remark,hss_id,health_remark,family_situation_id,number_of_children) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return pool.execute(query,[FirstName,FatherName,LastName,Phone,date,ngadd,stadd,houseadd,housefloor,adddetails,price,propertyid,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,famsitu,childnum])
}
function fillInformation1(FirstName,FatherName,LastName,Phone,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark){
    const query=`INSERT INTO beneficiary (first_name,middle_name,last_name,phone_number,birth_date,professional_status_id,sector_id,job_desc,job_address,job_salary,job_remark,social_service_remark,hss_id,health_remark) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return pool.execute(query,[FirstName,FatherName,LastName,Phone,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark])
}
function fillInformation2(FirstName,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,Cls,Establishment,School_address){
    const query=`INSERT INTO beneficiary (first_name,birth_date,professional_status_id,sector_id,job_desc,job_address,job_salary,job_remark,social_service_remark,hss_id,health_remark,class,establishment,school_address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return pool.execute(query,[FirstName,date,profstatid,secid,jobdesc,jobadd,jobsal,jobrem,social_service_remark,hss_id,hremark,Cls,Establishment,School_address])
}
function selectPropertyStatus(){
    const query="SELECT * FROM property_status"
    return pool.execute(query)
}
function fillHealthSituation(buys,startd,enddt,com,diseases,medicines,ben){
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
    fillInformation2
}
