const pool = require('../util/database');

function selectAllAvailableFamilies(){
    const query = "SELECT b_id, first_name, middle_name, last_name FROM beneficiary WHERE main_beneficiary = 'yes' AND decision_closure_date IS NULL;";
    
    return pool.execute(query)
}

module.exports= {
    selectAllAvailableFamilies
}