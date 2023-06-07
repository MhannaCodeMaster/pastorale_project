const pool=require('../util/database')

function fillInformation(FirstName,FatherName,LastName,Phone,date,ngadd,stadd,houseadd,housefloor,adddetails,price,propertyid){
    const query=`INSERT INTO beneficiary (first_name,middle_name,last_name,phone_number,birth_date,neighborhood_address,street_address,house_address,house_floor,address_details,price_of_rent,property_status_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    return pool.execute(query,[FirstName,FatherName,LastName,Phone,date,ngadd,stadd,houseadd,housefloor,adddetails,price,propertyid])
}
function selectPropertyStatus(){
    const query="SELECT * FROM property_status"
    return pool.execute(query)
}
module.exports = {fillInformation,selectPropertyStatus}
