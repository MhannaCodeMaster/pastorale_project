// models/donationModel.js

const pool = require('../util/database');

// Get all donations from the database
function getAllDonations() {
  const query = 'SELECT * FROM donation d, recipient r WHERE d.recipient_type = r.recipient_id ORDER BY d.donation_id DESC';
  return pool.execute(query)
}


function insertDonation(data){
  const query = "INSERT INTO donation(donator_name, donation_content, donation_date, recipient_type, donation_type) VALUES (?, ?, ?, ?, ?)"
  return pool.execute(query,[data.donatorName, data.donationContent, data.donationDate, data.recipientType, data.donationType])
}

function selectDonation(donationId) {
    const query = "SELECT * FROM donation WHERE donation_id = ?";
    return pool.execute(query,[donationId])
}

// Update a donation in the database
function updateDonation(data, donationId) {
  
  const query = "UPDATE donation SET donator_name = ?, donation_content = ?, donation_date = ?, recipient_type = ?, donation_type = ? WHERE donation_id = ?";
  console.log(query)
  return pool.execute(query, [data.donatorName, data.donationContent, data.donationDate, data.recipientType, data.donationType, donationId])
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
  
  selectDonationTypes,
  selectRecipient,
  insertDonation
  
};