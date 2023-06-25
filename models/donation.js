// models/donationModel.js

const pool = require('../util/database');

// Get all donations from the database
async function getAllDonations() {
  const query = 'SELECT d.donation_id, d.donator_name, dt.donation_type, d.donation_content,  d.donation_date, r.recipient_desc FROM donation d, donation_type dt, recipient r WHERE d.recipient_type = r.recipient_id AND dt.type_id = d.donation_type ORDER BY d.donation_id DESC';
  return pool.execute(query)
}
async function getSelectedDonations(donationIds) {
  const selectedDonations = [];
  const idsString = donationIds.join(',');
  const query = `SELECT d.donation_id, d.donator_name, dt.donation_type, d.donation_content, d.donation_date, r.recipient_desc FROM donation d, donation_type dt, recipient r WHERE d.donation_id IN (${idsString}) AND d.recipient_type = r.recipient_id AND dt.type_id = d.donation_type ORDER BY d.donation_id DESC`;
  return pool.execute(query);
  
}




async function insertDonation(data){
  if(data.donationType=='others'){
     await insertDonationType(data.customDonationType).then(([insertDType])=>{
      data.donationType = insertDType.insertId
      
    }).catch((err)=>{
      console.log(err)
    })

  }
  const query = "INSERT INTO donation(donator_name, donation_content, donation_date, recipient_type, donation_type) VALUES (?, ?, ?, ?, ?)"
  return pool.execute(query,[data.donatorName, data.donationContent, data.donationDate, data.recipientType, data.donationType])
}

function selectDonation(donationId) {
    const query = "SELECT * FROM donation WHERE donation_id = ?";
    return pool.execute(query,[donationId])
}

// Update a donation in the database
async function updateDonation(data, donationId) {
  if(data.donationType=='others'){
    await insertDonationType(data.customDonationType).then(([insertDType])=>{
     data.donationType = insertDType.insertId
     
   }).catch((err)=>{
     console.log(err)
   })

 }
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

function insertDonationType(dName){
  const query = "INSERT INTO donation_type (donation_type) VALUES (?)"
  return pool.execute(query, [dName])
}




module.exports = {
  getAllDonations,
  updateDonation,
  selectDonation,
  
  selectDonationTypes,
  selectRecipient,
  insertDonation,
  insertDonationType,
  getSelectedDonations
  
  
};
