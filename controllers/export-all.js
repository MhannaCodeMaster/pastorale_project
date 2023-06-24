const excelJS = require('exceljs');
const Beneficiary = require('../models/beneficiary')


/*------Functions that handle chosen export data------*/
function exportAllData(req,res,next){
  const workbook = new excelJS.Workbook();
  workbook.created = new Date();
  workbook.modified = new Date();
  const mainBeneficiary_Sheet = workbook.addWorksheet("Main Beneficiary");
  const relatedBeneficiries_sheet = workbook.addWorksheet("Related Beneficiary");
  const healthSituation_sheet = workbook.addWorksheet("Beneficiary Health");

  mainBeneficiary_Sheet.addTable({
      name: 'Beneficary Families',
      ref: 'A1',
      headerRow: true,
      style: {
        showRowStripes: true,
      },
      columns:[
        {name: 'Main Beneficiary'},
        {name: 'Phone number'},
        {name: 'Birth Date'},
        {name: 'Number of children'},
        {name: 'Job desc'},
        {name: 'Job salary'},
        {name: 'Neighborhood Address'},
        {name: 'House Address'},
        {name: 'House Floor'},
        {name: 'Address Details'},
        {name: 'Price Of Rent'},
        {name: 'Neighborhood Address'},
        {name: 'Interview Location'},
        {name: 'Interview Date'},
        {name: 'Decision Closure Date'},
        {name: 'Family Situation'},
        {name: 'Sector Type'},
        {name: 'Professional Status'},
        {name: 'Interviewer'},
        {name: 'Health Social Service'},
        {name: 'Property Status'},
        {name: 'f_id'},
        {name: 'Monthly Gain'},
        {name: 'Monthly Spent'},
        {name: 'Price Of Rent'},
        {name: 'Price of dish'},
        {name: 'Price of Phone internet'},
        {name: 'Price of Cellular'},
        {name: 'Price of Electricity'},
        {name: 'Price of Generator'},
        {name: 'Price of Loan'},
        {name: 'Price of Others'},
        {name: 'financial Remark'},
      ],
      rows:[],
  });

  relatedBeneficiries_sheet.addTable({
    name: 'Related Beneficiary',
    ref: 'A1',
    headerRow: true,
    style: {
      showRowStripes: true,
    },
    columns:[
      {name: 'Main Beneficiary'},
      {name: 'Relation'},
      {name: 'Name'},
      {name: 'Birth Date'},
      {name: 'Phone Number'},
      {name: 'Professional Status'},
      {name: 'Job Description'},
      {name: 'Job Salary'},
      {name: 'Job Remark'},
      {name: 'Sector Type'},
      {name: 'Health Social Service'},
      {name: 'Column1'},
      {name: 'Column2'},
    ],
    rows:[],
  });

  const main_table = mainBeneficiary_Sheet.getTable("Beneficary Families");
  const related_table = relatedBeneficiries_sheet.getTable('Related Beneficiary');
  let mainBeneficiary = [];
  
  let beneficiary_ids = req.body.selected;
  if(!beneficiary_ids) beneficiary_ids = null;
  //console.log('export ids:' ,beneficiary_ids);
  Beneficiary.Beneficiary.getAllBeneficiariesData(beneficiary_ids)
  .then((result) => {
    //console.log('Beneficiary data: ',result);
    mainBeneficiary = result;
    const main_rows = mainBeneficiary.map(obj => {
      const { b_id, ...rest } = obj;
      return Object.values(rest);
    });
    main_rows.forEach(row=>{
      main_table.addRow(row);
    })
    main_table.commit();
    let numberOfRowsAdded=1;
    const relatedPromises = mainBeneficiary.map(ben => {
      return Beneficiary.Beneficiary.getRealtedBeneficiaries(ben.b_id)
        .then(([related]) => {
          if (related.length !== 0) {
            const related_rows = related.map(obj => {
              const value = Object.values(obj);
              value.unshift("");
              return value;
            });
            related_rows[0][0] = ben.main_beneficiary_full_name;
            related_rows.forEach(row=>{
              related_table.addRow(row);
              numberOfRowsAdded++;
            })
            //console.log(related_rows);
            related_table.addRow([]);
            numberOfRowsAdded++;
            const lastRowNumber = numberOfRowsAdded;
            //console.log('Last row Number: ',lastRowNumber);
            //console.log('column_count: ',relatedBeneficiries_sheet.columnCount);
            for (let i = 1; i <= relatedBeneficiries_sheet.columnCount; i++) {
              const cell = relatedBeneficiries_sheet.getCell(lastRowNumber, i);
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '9F9F9F' },
              };
            }

          }
        });
    });

    Promise.all(relatedPromises)
      .then(() => {
        related_table.commit();
        for(let i = 1;i<=33;i++){
          mainBeneficiary_Sheet.getColumn(i).width = 26;
        }
        for(let i = 1;i<=12;i++){
          relatedBeneficiries_sheet.getColumn(i).width = 26;
        }

        workbook.xlsx.writeBuffer()
          .then((buffer) => {
            // Set response headers for file download
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=beneficiary_families.xlsx');
            res.setHeader('Content-Length', buffer.length);

            // Send the buffer as the response
            res.send(buffer);
          })
          .catch((error) => {
            console.error('Error creating Excel file:', error);
            res.status(500).send('Internal Server Error');
          });
      })
      .catch(err => {
        next(err);
      });
  })
  .catch(err => {
    next(err);
  });
}

function exportAddress(req,res,next){
  const workbook = new excelJS.Workbook();
  workbook.created = new Date();
  workbook.modified = new Date();
  const beneficiaryAddress_Sheet = workbook.addWorksheet("Main Beneficiary");

  beneficiaryAddress_Sheet.addTable({
      name: 'Beneficary Address',
      ref: 'A1',
      headerRow: true,
      style: {
        showRowStripes: true,
      },
      columns:[
        {name: 'Beneficiary'},
        {name: 'Neighborhood Address'},
        {name: 'Street Address'},
        {name: 'House Address'},
        {name: 'House Floor'},
        {name: 'Address details'},
      ],
      rows:[],
  });

  const address_table = beneficiaryAddress_Sheet.getTable("Beneficary Address");
  Beneficiary.Beneficiary.getBeneficiariesAddress()
  .then(([result])=>{
    const address_rows = result.map(obj => {
      const { b_id, ...rest } = obj;
      return Object.values(rest);
    });
    address_rows.forEach(row=>{
      address_table.addRow(row);
    })
    address_table.commit();
    for(let i = 1;i<=6;i++){
      beneficiaryAddress_Sheet.getColumn(i).width = 26;
    }

    workbook.xlsx.writeBuffer()
      .then((buffer) => {
        // Set response headers for file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=beneficiaries_address.xlsx');
        res.setHeader('Content-Length', buffer.length);

        // Send the buffer as the response
        res.send(buffer);
      })
      .catch((error) => {
        console.error('Error creating Excel file:', error);
        next(error);
      });
  })
  .catch(err=>{
    next(err);
  })

}

function exportHealth(req,res,next){

}


exports.exportAll = (req, res, next) => {
  exportAllData(req,res,next)
};

exports.getPage = (req, res, next) => {
  const pageTitle = 'Export';
  const username = req.session.username;
  res.render('../view/export.ejs',{pageTitle,username});
}

exports.postExport = (req, res, next)=>{
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  if(!start_date){
    const dataToExtract = req.body.selected_data;
    if(dataToExtract === 'all'){
      exportAllData(req,res,next)
    }else if(dataToExtract === 'address'){
      exportAddress(req,res,next);
    }else if(dataToExtract === 'health'){
      exportHealth(req,res,next);
    }
  }
}