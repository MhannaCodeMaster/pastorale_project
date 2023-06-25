// controllers/donationController.js
const moment = require('moment')
const donationModel = require('../models/donation');
const beneficiaryModel = require('../models/beneficiary')
const familyDonationModel = require('../models/familyDonation')

// Render the donations view with all donations
function getAllDonations(req, res) {
  donationModel.getAllDonations().then(([donations])=>{
    donationModel.selectDonationTypes().then(([donationTypes])=>{
      const username = req.session.username;
      res.render('../view/donations.ejs',{donations, donationTypes, pageTitle: 'donations', username})

    }).catch((err)=>{
      res.status(400).send("something went wrong")
    })
    
    
  }).catch((err)=>{
    res.status(400).send("something went wrong")
  })
    
}

//Render the edit donation form
function editDonationForm(req, res) {
  const username = req.session.username;
  const pageTitle = 'Edit donation';
    const donationId = req.params.id;
    console.log(donationId)
    // Retrieve the donation data from the database based on the donationId
    donationModel.selectDonation(donationId)
      .then((result) => {
        const donation = result[0]; // Access the first object in the result array
       
        donationModel.selectDonationTypes().then(([donationTypes])=>{
          
          donationModel.selectRecipient().then(([recipients])=>{
            
            beneficiaryModel.selectAllAvailableFamilies().then(([families])=>{
              
              familyDonationModel.selectSelectedFamilies(donationId).then(([selectedFamilies])=>{
                console.log(selectedFamilies)

                const familyCommentsMap = selectedFamilies.reduce((map, family) => {
                  map[family.family_id] = family.comment;
                  return map;
                }, {});

                const filteredFamilies = families.map(family => {
                  const comment = familyCommentsMap[family.family_id] || '';
                  return { ...family, comment };
                });
          
                const selectedFamilyIds = selectedFamilies.map(family => family.family_id);
                const shiftedFamilies = filteredFamilies.sort((a, b) => {
                  const isSelectedA = selectedFamilyIds.includes(a.b_id);
                  const isSelectedB = selectedFamilyIds.includes(b.b_id);
                  if (isSelectedA && !isSelectedB) {
                    return -1;
                  } else if (!isSelectedA && isSelectedB) {
                    return 1;
                  } else {
                    return 0;
                  }
                });
                
          
                
                console.log(familyCommentsMap)
                console.log(filteredFamilies)
                console.log(shiftedFamilies)
                console.log(selectedFamilyIds)
                res.render("../view/edit_donation.ejs", {
                  username, pageTitle,donation, donationTypes, recipients, families: shiftedFamilies, familyCommentsMap, moment
                })
              })
            })
          })
        }).catch((err)=>{
          console.log(err)
        })

        
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Something went wrong");
      });
  }

// Update a donation
function updateDonation(req, res) {
  const donationId = req.params.id
  const updatedData = req.body
  const familyPairs = req.body.familyPair
  console.log(updatedData)

  donationModel.updateDonation(updatedData, donationId).then(([result])=>{
    
    familyDonationModel.deleteFamilyDonations(donationId).then(([deletion])=>{

    
      if(updatedData.recipientType == '2'){
  
        for (let i = 0; i < familyPairs.length; i += 2) {
            const checkboxValue = familyPairs[i];
          const commentValue = familyPairs[i + 1];
          if (checkboxValue == '') {
          i--
           continue;
        }
          familyDonationModel.insertFamilyDonation(checkboxValue, donationId, commentValue).then(([famdon])=>{
          console.log(checkboxValue, commentValue, donationId)

          }).catch((err)=>{
            console.log(err)
          })
           
        }
      }
    })
      console.log(req.body)}).catch((err)=>{
        console.log(err)
     })

     res.redirect("/donations")
}

function emptyDonationForm(req, res){
  beneficiaryModel.selectAllAvailableFamilies().then(([families])=>{
    donationModel.selectDonationTypes().then(([donationTypes])=>{
      donationModel.selectRecipient().then(([recipients])=>{
        //console.log(recipients)
        const username = req.session.username;
        const pageTitle = 'Add donation';
        res.render('../view/add_donation', {
          username,
          pageTitle,
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
  
    const familyPairs = req.body.familyPair;
    const selectedFamilies = req.body.selectedFamilies
  const donationData = req.body
  console.log(donationData)
  
  console.log(donationData)
  donationModel.insertDonation(donationData).then(([result])=>{
    
    if(donationData.recipientType == '2'){
  
      for (let i = 0; i < familyPairs.length; i += 2) {
          const checkboxValue = familyPairs[i];
        const commentValue = familyPairs[i + 1];
        if (checkboxValue == '') {
         i--
          continue;
        }
        familyDonationModel.insertFamilyDonation(checkboxValue, result.insertId, commentValue).then(([famdon])=>{
        console.log(checkboxValue, commentValue, result.insertId)

        }).catch((err)=>{
          console.log(err)
        })
           
      }
    }
      console.log(req.body)}).catch((err)=>{
        console.log(err)
     })

     res.redirect("/donations")
  }

  








   

      

  



module.exports = {
  getAllDonations,
  editDonationForm,
  updateDonation,
  emptyDonationForm,
  insertDonation
  
};
