const excelJS = require('exceljs');
const Beneficiary = require('../models/beneficiary')
const db = require('../util/database');

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
      {name: 'profesional_status_other'},
      {name: 'school_address'},
      {name: 'class'},
      {name: 'establishment'},
      {name: 'Professional Status'},
      {name: 'Job Description'},
      {name: 'Job address'},
      {name: 'Job Salary'},
      {name: 'Job Remark'},
      {name: 'Sector Type'},
      {name: 'Health Social Service'},
      {name: 'health_service_other'},
    ],
    rows:[],
  });

  healthSituation_sheet.addTable({
    name: 'Beneficiary Health situation',
    ref: 'A1',
    headerRow: true,
    style: {
      showRowStripes: true,
    },
    columns:[
      {name: 'Beneficiary'},
      {name: 'Medicine'},
      {name: 'Disease'},
      {name: 'Buy'},
      {name: 'Start Date'},
      {name: 'End Date'},
      {name: 'Remark'},
    ],
    rows:[],
  });

  const main_table = mainBeneficiary_Sheet.getTable("Beneficary Families");
  const related_table = relatedBeneficiries_sheet.getTable("Related Beneficiary");
  const health_table = healthSituation_sheet.getTable("Beneficiary Health situation");
  let mainBeneficiary;
  
  let beneficiary_ids = req.body.selected;
  if(!beneficiary_ids) beneficiary_ids = null;
  //console.log('export ids:' ,beneficiary_ids);
  Beneficiary.Beneficiary.getAllBeneficiariesData(beneficiary_ids)
  .then((result) => {
    //console.log('Beneficiary data: ',result);
    if(!beneficiary_ids) mainBeneficiary = result[0];
    else mainBeneficiary = result;
    const main_rows = mainBeneficiary.map(obj => {
      const { b_id, ...rest } = obj;
      return Object.values(rest);
    });
    main_rows.forEach(row=>{
      main_table.addRow(row);
    })
  
    let numberOfRowsAdded=1;
    const relatedPromises = mainBeneficiary.map(ben => {
      return Beneficiary.Beneficiary.getMainBeneficiaryHealth(ben.b_id)
      .then(([result])=>{
        if(result.length != 0){
          const health_row = result.map(obj => Object.values(obj));
          
          health_row.forEach(row=>{
            health_table.addRow(row);
          })
          health_table.commit();
        }
        return Beneficiary.Beneficiary.getRealtedBeneficiaries(ben.b_id)
      })
      .then(([related]) => {
        if (related.length !== 0) {
          return Beneficiary.Beneficiary.getBeneficiariesHealth(related)
          .then((relatedHealth)=>{
            if(relatedHealth != 0){
              const relatedHealth_row = relatedHealth.map(obj => {
                return Object.values(obj);
              });
  
              relatedHealth_row.forEach(row=>{
                health_table.addRow(row);
              });
            }

            const related_rows = related.map(obj => {
              const [b_id,...rest] = Object.values(obj);
              rest.unshift("");
              return rest;
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

          })

        }
        return;
      });
    });

    Promise.all(relatedPromises)
      .then(() => {
        main_table.commit();
        related_table.commit();
        health_table.commit();
        for(let i = 1;i<=mainBeneficiary_Sheet.columnCount;i++){
          mainBeneficiary_Sheet.getColumn(i).width = 26;
        }
        for(let i = 1;i<=relatedBeneficiries_sheet.columnCount;i++){
          relatedBeneficiries_sheet.getColumn(i).width = 26;
        }
        for(let i = 1;i<=healthSituation_sheet.columnCount;i++){
          healthSituation_sheet.getColumn(i).width = 26;
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
        {name:'Phone Number'},
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
  const workbook = new excelJS.Workbook();
  workbook.created = new Date();
  workbook.modified = new Date();
  
  const healthSituation_sheet = workbook.addWorksheet("Beneficiary Health");
  healthSituation_sheet.addTable({
    name: 'Beneficiary Health situation',
    ref: 'A1',
    headerRow: true,
    style: {
      showRowStripes: true,
    },
    columns:[
      {name: 'Beneficiary'},
      {name: 'Medicine'},
      {name: 'Disease'},
      {name: 'Buy'},
      {name: 'Start Date'},
      {name: 'End Date'},
      {name: 'Remark'},
    ],
    rows:[],
  });

  const health_table = healthSituation_sheet.getTable("Beneficiary Health situation");
  Beneficiary.Beneficiary.getBeneficiariesHealth()
  .then(([result])=>{
    const health_row = result.map(obj => Object.values(obj));
    health_row.forEach(row=>{
      health_table.addRow(row);
    });
    health_table.commit();

    for(let i = 1;i<=healthSituation_sheet.columnCount;i++){
      healthSituation_sheet.getColumn(i).width = 26;
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
}


exports.exportAll = (req, res, next) => {
  exportAllData(req,res,next)
};

exports.getPage = (req, res, next) => {
  const pageTitle = 'Export';
  const username = req.session.username;
  db.execute("SELECT * FROM activity").then(([activities])=>{
    res.render('../view/export.ejs',{pageTitle,username,activities});
  })
}

exports.postExport = (req, res, next)=>{
  const dataToExtract = req.body.selected_data;
  if(dataToExtract === 'all'){
    exportAllData(req,res,next)
  }else if(dataToExtract === 'address'){
    exportAddress(req,res,next);
  }else if(dataToExtract === 'health'){
    exportHealth(req,res,next);
  }
}