const donationModel = require('../models/donation');
const familyModel = require('../models/familyDonation');
const XLSX = require('xlsx');
// const XLSX = require('xlsx-style');


function exportDonations(req, res) {
  donationModel.getAllDonations()
    .then(([results]) => {
      const filteredResults = results.map(({ donation_id, ...rest }) => rest);
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      console.log(results)
      // Create a new worksheet
      const worksheet = XLSX.utils.json_to_sheet(filteredResults);
      
      

      // Generate a range object
      const range = XLSX.utils.decode_range(worksheet['!ref']);

      // Iterate through the results
      for (let i = 0; i < results.length; i++) {
        const donation = results[i];

        // Check if the donator is "families"
        
          // Retrieve the related families for the donation
          familyModel.selectSelectedFamilies(donation.donation_id)
            .then(([relatedFamilies]) => {
              
              // Create a bullet point list string
              let bulletPoints = '';
              for (let j = 0; j < relatedFamilies.length; j++) {
                bulletPoints += '\u2022 ' + relatedFamilies[j].first_name +' ' +  relatedFamilies[j].middle_name + ' '+ relatedFamilies[j].last_name +'\n';
              }

              // Add the bullet points to the cell
              worksheet[`F${i + 2}`] = { t: 's', v: bulletPoints };

              // Check if it's the last iteration
              if (i == results.length - 1) {
                // Remove the last column from the range
                range.e.c++;

                // Reencode the range
                worksheet['!ref'] = XLSX.utils.encode_range(range);
                console.log(worksheet)
                
              

                // Add the worksheet to the workbook
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Donation Report');

                // Write the workbook to a buffer
                const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

                // Set the response headers for downloading the file
                res.setHeader('Content-Disposition', 'attachment; filename="donation_report.xlsx"');
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

                // Send the Excel file as a response
                res.send(excelBuffer);
              }
            })
            .catch((err) => {
              res.send('Something went wrong');
              console.log(err);
            });
        
      }
    })
    .catch((err) => {
      res.send('Something went wrong');
      console.log(err);
    });
}





async function exportDonationsSelected(req, res) {
  try {
    const [results] = await donationModel.getSelectedDonations(req.body.export);

    console.log(results)
    const filteredResults = results.map(({ donation_id, ...rest }) => rest);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredResults);
    const range = XLSX.utils.decode_range(worksheet['!ref']);

    for (let i = 0; i < results.length; i++) {
      const donation = results[i];
      
      const [relatedFamilies] = await familyModel.selectSelectedFamilies(donation.donation_id);

      let bulletPoints = '';
      for (let j = 0; j < relatedFamilies.length; j++) {
        bulletPoints += '\u2022 ' + relatedFamilies[j].first_name + ' ' + relatedFamilies[j].middle_name + ' ' + relatedFamilies[j].last_name + '\n';
      }

      worksheet[`F${i + 2}`] = { t: 's', v: bulletPoints };

      if (i === results.length - 1) {
        range.e.c++;
        worksheet['!ref'] = XLSX.utils.encode_range(range);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Donation Report');
        const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename="donation_report.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        res.send(excelBuffer);
      }
    }
  } catch (err) {
    res.send('Something went wrong');
    console.log(err);
  }
}

module.exports = {
  exportDonations,
  exportDonationsSelected
};
