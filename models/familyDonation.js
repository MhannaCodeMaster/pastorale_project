const pool = require('../util/database');

function insertFamilyDonation(familyId, donationId, comment){
    const query = "INSERT INTO family_donation(family_id, donation_id, comment) VALUES (?, ?, ?)"
    return pool.execute(query, [familyId, donationId, comment] )
}


function selectSelectedFamilies(donationId){
    const query = "SELECT * FROM family_donation WHERE donation_id = ?"
    return pool.execute(query,[donationId])
}

function deleteFamilyDonations(donationId){
    const query = "DELETE FROM family_donation WHERE donation_id = ?"
    return pool.execute(query, [donationId])
}

module.exports = {
    insertFamilyDonation,
    selectSelectedFamilies,
    deleteFamilyDonations
}