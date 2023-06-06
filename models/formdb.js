const pool=require('../util/database')

function fillInformation(FirstName,FatherName,LastName,Phone){
    const query=`INSERT INTO beneficiary (first_name,middle_name,last_name,phone_number) VALUES (?,?,?,?)`;
    return pool.execute(query,[FirstName,FatherName,LastName,Phone])
}
module.exports = {fillInformation,}