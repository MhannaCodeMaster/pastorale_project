const db = require('../util/database');

class Beneficiary{
    constructor(formdata){
        
    }

    static getAll(){
        return db.execute("SELECT * FROM beneficiary WHERE main_beneficiary = 'YES'");
    }
}
module.exports = Beneficiary;