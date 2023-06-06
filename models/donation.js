// models/donationModel.js

const pool = require('../util/database');

// Get all donations from the database
function getAllDonations() {
  const query = 'SELECT * FROM donation d, recipient r WHERE d.recipient_type = r.recipient_id ';
  return pool.execute(query)
}


function insertDonation(data){
  const query = "INSERT INTO donation(donator_name, donation_content, donation_date, recipient_type, donation_type) VALUES (?, ?, ?, ?, ?)"
  return pool.execute(query,[data.donatorName, data.donationContent, data.donationDate, data.recipientType, data.donationType])
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
  const query = "SELECT b_id, first_name, middle_name, last_name FROM beneficiary WHERE main_beneficiary = 'yes' AND decision_closure_date IS NULL;";
  
  return pool.execute(query)
}

function selectDonationTypes(){
  const query= "SELECT * FROM donation_type"
  return pool.execute(query)
}

function selectRecipient(){
  const query = "SELECT * FROM recipient"
  return pool.execute(query)
}

module.exports = {
  getAllDonations,
  updateDonation,
  selectDonation,
  selectAllAvailableFamilies,
  selectDonationTypes,
  selectRecipient,
  insertDonation
};
