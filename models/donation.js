// models/donationModel.js

const pool = require('../util/database');

// Get all donations from the database
function getAllDonations() {
  const query = 'SELECT * FROM donations';
  return pool.execute(query)
}

function selectDonation(donationId) {
    const query = 'SELECT * FROM donations WHERE donation_id = ?';
    return pool.execute(query,[donationId])
}

// Update a donation in the database
function updateDonation(donationId, updatedData) {
  const query = "UPDATE donations SET donator_name = ?, donation_content = ? WHERE donation_id = ?";
  console.log(query)
  return pool.execute(query, [updatedData.name, updatedData.amount, donationId])
}

function selectAllAvailableFamilies(){
  const query = "SELECT b_id, first_name, middle_name, last_name FROM beneficiary WHERE main_beneficiary = 'yes', decision_closure_date = NULL LIMIT 0, 25";
  
  return pool.execute(query)
}

module.exports = {
  getAllDonations,
  updateDonation,
  selectDonation,
  selectAllAvailableFamilies
};
