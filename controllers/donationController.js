// controllers/donationController.js

const donationModel = require('../models/donation');

// Render the donations view with all donations
function getAllDonations(req, res) {
  donationModel.getAllDonations().then(([donations])=>{
    
    res.render('../view/donations.ejs',{donations})
  }).catch((err)=>{
    res.status(400).send("something went wrong")
  })
    
}

// Render the edit donation form
function editDonationForm(req, res) {
    const donationId = req.params.id;
    // Retrieve the donation data from the database based on the donationId
    donationModel.selectDonation(donationId)
      .then((result) => {
        if (result.length > 0) {
          const donation = result[0];
          // Access the donation data
          
          res.render('../view/edit_donation', { donation });
        } else {
          res.status(404).send("Donation not found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Something went wrong");
      });
  }

  


// Update a donation
function updateDonation(req, res) {
  const donationId = req.params.id;
  const updatedData = req.body;
  console.log(updatedData.name, updatedData.content)
  // Update the donation in the database based on the donationId and updatedData
  donationModel.updateDonation(donationId, updatedData).then(({result})=>{
    res.redirect('/donations');
  }).catch((err)=>{
    res.status(400).send("something went wrong")
  })

  

//   
}

module.exports = {
  getAllDonations,
  editDonationForm,
  updateDonation
};
