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

function emptyDonationForm(req, res){
  donationModel.selectAllAvailableFamilies().then(([families])=>{
    donationModel.selectDonationTypes().then(([donationTypes])=>{
      donationModel.selectRecipient().then(([recipients])=>{
        console.log(recipients)
        res.render('../view/add_donation', {
          families: families,
          donationTypes: donationTypes,
          recipients: recipients
        });
  
      }).catch((err)=>{
        res.status(400).send("something went wrong")
      })
    }).catch((err)=>{
      res.status(400).send("something went wrong")
    })
  }).catch((err)=>{
    res.status(400).send("something went wrong")
  })
}

function insertDonation(req, res){
  const selectedFamilies = req.body.selectedFamilies
  const donationData = req.body
  console.log(donationData)
  donationModel.insertDonation(donationData).then(([result])=>{
    console.log(result)
  }).catch((err)=>{
    console.log(err)
  });

  let i = 0
  // selectedFamilies.forEach(familyId =>{
     
  //     // The checkbox is checked, add it to the database
  //     const comment = req.body.familyComments[i]
  //     // Add logic to insert the family and comment into the database
  //     console.log(familyId, comment)
  //   i++
  // });
  
  
}

module.exports = {
  getAllDonations,
  editDonationForm,
  updateDonation,
  emptyDonationForm,
  insertDonation
};
