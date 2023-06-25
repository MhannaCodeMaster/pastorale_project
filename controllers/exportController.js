const donationModel = require('../models/donation');
const familyModel = require('../models/familyDonation');
const XLSX = require('xlsx');
// const XLSX = require('xlsx-style');


async function exportDonationsSelected(req, res) {
  try {
    const [results] = await donationModel.getSelectedDonations(req.body.export);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Donation Report');

    // Define colors for row background
    const rowColors = ['d1d1d1', '9a9a9a'];
    let rowIndex = 1;

    // Set header row style
    const headerRow = worksheet.getRow(rowIndex);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ff9cadce' }, // Header color
    };

    // Set header row data
    headerRow.getCell(1).value = 'Date';
    headerRow.getCell(2).value = 'Name';
    headerRow.getCell(3).value = 'Donation Type';

    headerRow.getCell(4).value = 'Donation Content';
    headerRow.getCell(5).value = 'Recipient';
    headerRow.getCell(6).value = 'Families';
    headerRow.eachCell((cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    rowIndex++;

    // Set data rows style and values
    for (const donation of results) {
      const dataRow = worksheet.getRow(rowIndex);

      // Apply alternating row background color
      const rowColor = rowColors[rowIndex % rowColors.length];
      dataRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: rowColor },
      };

      // Set data row values
      dataRow.getCell(1).value = donation.donation_date;
      dataRow.getCell(2).value = donation.donator_name;
      dataRow.getCell(3).value = donation.donation_type;
      dataRow.getCell(4).value = donation.donation_content;
      dataRow.getCell(5).value = donation.recipient_desc;
      dataRow.eachCell((cell) => {
        cell.alignment = { vertical: 'top', horizontal: 'center' };
      });
      
      

      // Retrieve the related families for the donation
      const [relatedFamilies] = await familyModel.selectSelectedFamilies(donation.donation_id);

      // Create bullet points string
      let bulletPoints = '';
      for (const family of relatedFamilies) {
        bulletPoints += `• ${family.first_name} ${family.middle_name} ${family.last_name}: ${family.comment} \n`;
      }
      const bulletPointsCell = dataRow.getCell(6);
      bulletPointsCell.value = bulletPoints;

      // Wrap text and adjust row height
     

      // Wrap text and adjust row height
      bulletPointsCell.alignment = { wrapText: true };
      const wrappedLines = bulletPoints.split('\n').length;
      const minHeight = 20; // Minimum row height
      const calculatedHeight = minHeight * wrappedLines;
      const currentHeight = dataRow.height || worksheet.properties.defaultRowHeight;
      dataRow.height = Math.max(currentHeight, calculatedHeight);



      rowIndex++;
    }
    
    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });

    // Generate buffer for the workbook
    const buffer = await workbook.xlsx.writeBuffer();

    // Set response headers for downloading the file
    res.setHeader('Content-Disposition', 'attachment; filename="donation_report.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the Excel file as a response
    res.send(buffer);
  } catch (err) {
    res.send('Something went wrong');
    console.log(err);
  }
}





// async function exportDonationsSelected(req, res) {
//   try {
//     const [results] = await donationModel.getSelectedDonations(req.body.export);

//     console.log(results)
//     const filteredResults = results.map(({ donation_id, ...rest }) => rest);
//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.json_to_sheet(filteredResults);
//     const range = XLSX.utils.decode_range(worksheet['!ref']);

//     for (let i = 0; i < results.length; i++) {
//       const donation = results[i];
      
//       const [relatedFamilies] = await familyModel.selectSelectedFamilies(donation.donation_id);

//       let bulletPoints = '';
//       for (let j = 0; j < relatedFamilies.length; j++) {
//         bulletPoints += '\u2022 ' + relatedFamilies[j].first_name + ' ' + relatedFamilies[j].middle_name + ' ' + relatedFamilies[j].last_name + '\n';
//       }

//       worksheet[`F${i + 2}`] = { t: 's', v: bulletPoints };

//       if (i === results.length - 1) {
//         range.e.c++;
//         worksheet['!ref'] = XLSX.utils.encode_range(range);

//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Donation Report');
//         const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

//         res.setHeader('Content-Disposition', 'attachment; filename="donation_report.xlsx"');
//         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

//         res.send(excelBuffer);
//       }
//     }
//   } catch (err) {
//     res.send('Something went wrong');
//     console.log(err);
//   }
// }




const ExcelJS = require('exceljs');

const { Alignment, Fill, Font } = ExcelJS;



async function exportDonationsSelected(req, res) {
  try {
    const [results] = await donationModel.getSelectedDonations(req.body.export);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Donation Report');

    // Define colors for row background
    const rowColors = ['d1d1d1', '9a9a9a'];
    let rowIndex = 1;

    // Set header row style
    const headerRow = worksheet.getRow(rowIndex);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ff9cadce' }, // Header color
    };

    // Set header row data
    headerRow.getCell(1).value = 'Date';
    headerRow.getCell(2).value = 'Name';
    headerRow.getCell(3).value = 'Donation Type';

    headerRow.getCell(4).value = 'Donation Content';
    headerRow.getCell(5).value = 'Recipient';
    headerRow.getCell(6).value = 'Families';
    headerRow.eachCell((cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    rowIndex++;

    // Set data rows style and values
    for (const donation of results) {
      const dataRow = worksheet.getRow(rowIndex);

      // Apply alternating row background color
      const rowColor = rowColors[rowIndex % rowColors.length];
      dataRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: rowColor },
      };

      // Set data row values
      dataRow.getCell(1).value = donation.donation_date;
      dataRow.getCell(2).value = donation.donator_name;
      dataRow.getCell(3).value = donation.donation_type;
      dataRow.getCell(4).value = donation.donation_content;
      dataRow.getCell(5).value = donation.recipient_desc;
      dataRow.eachCell((cell) => {
        cell.alignment = { vertical: 'top', horizontal: 'center' };
      });
      
      

      // Retrieve the related families for the donation
      const [relatedFamilies] = await familyModel.selectSelectedFamilies(donation.donation_id);

      // Create bullet points string
      let bulletPoints = '';
      for (const family of relatedFamilies) {
        bulletPoints += `• ${family.first_name} ${family.middle_name} ${family.last_name}: ${family.comment} \n`;
      }
      const bulletPointsCell = dataRow.getCell(6);
      bulletPointsCell.value = bulletPoints;

      // Wrap text and adjust row height
     

      // Wrap text and adjust row height
      bulletPointsCell.alignment = { wrapText: true };
      const wrappedLines = bulletPoints.split('\n').length;
      const minHeight = 20; // Minimum row height
      const calculatedHeight = minHeight * wrappedLines;
      const currentHeight = dataRow.height || worksheet.properties.defaultRowHeight;
      dataRow.height = Math.max(currentHeight, calculatedHeight);



      rowIndex++;
    }
    
    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });

    // Generate buffer for the workbook
    const buffer = await workbook.xlsx.writeBuffer();

    // Set response headers for downloading the file
    res.setHeader('Content-Disposition', 'attachment; filename="donation_report.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the Excel file as a response
    res.send(buffer);
  } catch (err) {
    res.send('Something went wrong');
    console.log(err);
  }
}




module.exports = {
  exportDonations,
  exportDonationsSelected
};
