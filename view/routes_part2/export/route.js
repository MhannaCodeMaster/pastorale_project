const express = require("express")
const router = express.Router()
const app = express();
var xl = require('excel4node');
const { getCurrencies, getBeneficiaries, getDonators, getTransferTypes, getTransfersExport, getActivities, getActivitiesExport, getActivityTransactions, getMedicationReceipts, getMedicationReceiptsExport, getMedications, getSourceCodes } = require("../../functions");

router.route("/").get(async(req, res) => {
    let data = {
        activities : await getActivities(req),
    }
    res.render("routes/export/index.ejs", data)
})

app.post("/",async(req, res) => {

    function addCommas(x) { 
        if(!x){
            return ""
        }
        var str = x.toString().split("."); 
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
        return str.join(".");
    }

    console.log(req.body)

        var wb = new xl.Workbook();
        var accountws = []
        // wb.addWorksheet('Sheet 1');

        var styleHeaders = wb.createStyle({
            font: {
            color: '#000000',
            size: 14,
            bold: true,
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
        })

        var styleBody = wb.createStyle({
            font: {
            color: '#444444',
            size: 12,
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
        })

        var styleBodyRed = wb.createStyle({
            font: {
            color: '#E04C5A',
            size: 12,
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
        })

        var styleBodyGreen = wb.createStyle({
            font: {
            color: '#5FBD75',
            size: 12,
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
        })

        let data = {
            currencies : await getCurrencies(),
            beneficiaries: await getBeneficiaries(),
            donators: await getDonators(),
            transfers: await getTransfersExport(req.body.accountsmonthfrom, req.body.accountsmonthto),
            transferTypes: await getTransferTypes(),
            activities: await getActivitiesExport(req.body.activitiesmonthfrom, req.body.activitiesmonthto, req.body.activities),
            activityTransactions : [],
            medReceipts: await getMedicationReceiptsExport(req.body.medicinemonthfrom, req.body.medicinemonthto),
        }



        if(req.body.inclusions.includes("account")){                     // ACCOUNTS
            
            for(let i=0; i<data.currencies.length; i++){
                let currentTransfers = data.transfers.filter(e=>e.id_currency == data.currencies[i].id_currency)
                if(currentTransfers.length > 0){
                    let ws = wb.addWorksheet(`${data.currencies[i].name_currency} account`);

                    let theaders = ["Date and Time", "Type", "Amount", "Balance", "To", "From", "Description"]

                    for(let j=0; j<theaders.length;j++){
                        ws.cell(1,j+1)
                        .string(theaders[j])
                        .style(styleHeaders)
                    }

                    for(let x=0; x<currentTransfers.length; x++){

                        var currentBeneficiary = ""
                        var currentDonator = ""

                        if(data.beneficiaries.find(e=> e.b_id == currentTransfers[x].id_beneficiary)){
                            var currentBeneficiary = data.beneficiaries.find(e=> e.b_id == currentTransfers[x].id_beneficiary)
                        }
                        if(data.donators.find(e=> e.id_donator == currentTransfers[x].id_donator)){
                            var currentDonator = data.donators.find(e=> e.id_donator == currentTransfers[x].id_donator)
                        }

                            ws.cell(x+2,1)
                            .string(currentTransfers[x].transferDate)
                            .style(styleBody)

                            ws.cell(x+2,2)
                            .string(data.transferTypes.find(e=> e.transferCode == currentTransfers[x].transferCode).transferTitle)
                            .style(styleBody)

                            ws.cell(x+2,3)
                            .string(data.currencies[i].symbol_currency + " " + String(addCommas(currentTransfers[x].moneyTransferred)))
                            .style(styleBody)

                            ws.cell(x+2,4)
                            .string(String(addCommas(currentTransfers[x].balance)))
                            .style(styleBody)

                            if(currentDonator){
                                ws.cell(x+2,6)
                                .string(currentDonator.name_donator)
                                .style(styleBody)
                            } else {
                                ws.cell(x+2,6)
                                .string("")
                                .style(styleBody)
                            }

                            if(currentBeneficiary){
                                ws.cell(x+2,5)
                                .string(currentBeneficiary.first_name + " " + currentBeneficiary.middle_name + " " + currentBeneficiary.last_name)
                                .style(styleBody)
                            } else {
                                ws.cell(x+2,5)
                                .string("")
                                .style(styleBody)
                            }

                            ws.cell(x+2,7)
                            .string(currentTransfers[x].description)
                            .style(styleBody)
                    }
                }
            }
        }

        if(req.body.inclusions.includes("activity")){

            if(data.activities.length > 0){

                let theaders = ["Date", "Title", "Total"]

                if(req.body.activities){

                    let ws = wb.addWorksheet(`activity: ${data.activities[0].activityTitle}`)
                    for(let i=0; i<theaders.length;i++){
                        ws.cell(1,i+1)
                        .string(theaders[i])
                        .style(styleHeaders)
                    }

                        data.activityTransactions = await getActivityTransactions(req.body.activities)

                            ws.cell(2,1)
                            .string(data.activities[0].activityDate)
                            .style(styleBody)
    
                            ws.cell(2,2)
                            .string(data.activities[0].activityTitle)
                            .style(styleBody)
    
                            ws.cell(2,3)
                            .string("L.L " + String(addCommas(data.activities[0].activityProfit)))
                            .style(styleBody)

                        let theaders2 = ["Description", "Debit", "Credit", "Comment"]

                        for(let i=0; i<theaders2.length;i++){
                            ws.cell(5,i+1)
                            .string(theaders2[i])
                            .style(styleHeaders)
                        }

                        for(let i=0; i<data.activityTransactions.length; i++){

                            ws.cell(i+7,1)
                            .string(data.activityTransactions[i].description)
                            .style(styleBody)

                            ws.cell(i+7,2)
                            .string(String("L.L " + addCommas(data.activityTransactions[i].debit)))
                            .style(styleBodyRed)

                            ws.cell(i+7,3)
                            .string(String("L.L " + addCommas(data.activityTransactions[i].credit)))
                            .style(styleBodyGreen)

                            ws.cell(i+7,4)
                            .string(data.activityTransactions[i].comment)
                            .style(styleBody)
    
                        }
                } else {
                    
                    let ws = wb.addWorksheet(`activities`)
                    for(let i=0; i<theaders.length;i++){
                        ws.cell(1,i+1)
                        .string(theaders[i])
                        .style(styleHeaders)
                    }

                    for(let i=0; i<data.activities.length; i++){
                        ws.cell(i+2,1)
                        .string(data.activities[i].activityDate)
                        .style(styleBody)

                        ws.cell(i+2,2)
                        .string(data.activities[i].activityTitle)
                        .style(styleBody)

                        ws.cell(i+2,3)
                        .string("L.L " + String(addCommas(data.activities[i].activityProfit)))
                        .style(styleBody)
                    }
                }
            }

        }  

        if(req.body.inclusions.includes("medicationreceipt")){

            let beneficiaries = await getBeneficiaries()
            let medications = await getMedications()
            let sources = await getSourceCodes()


                console.log("As")
                let ws = wb.addWorksheet(`medications`);

                let theaders = ["Month", "Name", "Medication", "Source", "Price", "Comment"]

                for(let i=0; i<theaders.length;i++){
                    ws.cell(1,i+1)
                    .string(theaders[i])
                    .style(styleHeaders)
                }

                let rowIndex = 2
                for(let i=0; i<beneficiaries.length; i++){
                    let currentBeneficiary = beneficiaries[i].first_name
                    let currentReceipts = data.medReceipts.filter(e=>e.id_beneficiary == beneficiaries[i].b_id)
                    
                    for(let j=0; j<currentReceipts.length; j++){

                        ws.cell(rowIndex,1)
                        .string(currentReceipts[j].receiptMonth)
                        .style(styleBody)
                        ws.cell(rowIndex,2)
                        .string(currentBeneficiary)
                        .style(styleBody)
                        ws.cell(rowIndex,3)
                        .string(medications.find(e=>e.medicine_id == currentReceipts[j].id_medicine).medicine_name)
                        .style(styleBody)
                        ws.cell(rowIndex,4)
                        .string(sources.find(e=>e.sourceCode == currentReceipts[j].sourceCode).sourceName)
                        .style(styleBody)
                        ws.cell(rowIndex,5)
                        .string(String("L.L " + addCommas(currentReceipts[j].price)))
                        .style(styleBody)
                        ws.cell(rowIndex,6)
                        .string(currentReceipts[j].comment)
                        .style(styleBody)
                        
                        rowIndex++
                    }
                }
        }

    let d = new Date()
    wb.write(`DataExport ${d.getDate() + "/" + String(Number(d.getMonth()+1)) + "/" + d.getFullYear()}.xlsx`, res)
})


module.exports = router