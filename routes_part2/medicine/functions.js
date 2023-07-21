const { db } = require("../../databaseInit.js")
const { getPatients, makeid, getMedicationReceipts, getSourceCodes, getCurrencies, getTransferTypes, getMedications, getTransfers } = require("../../functions.js")



function deleteAllPatient(patientID) {
    return new Promise((resolve, reject) => {
        let SQL = `DELETE FROM health_situation WHERE beneficiary_id = '${patientID}'`
        db.query(SQL, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

function reInsertPatient(req) {
    return new Promise(async(resolve, reject) => {
        let SQL = "INSERT into health_situation set ?"


        let patients = await getPatients()

        if (req.body.sicknessqty > 1) {

            for (let i = 0; i < req.body.sicknessqty; i++) {

                let newid = makeid(10)
                while (patients.find(e => e.id_medicine_taken == newid)) {
                    newid = makeid(10)
                }

                let item = {
                    beneficiary_id: req.body.patientid,
                    disease_id: req.body.sicknesspost[i],
                    medicine_id: req.body.medicationpost[i],
                    bought: 0,
                    remark: req.body.commentpost[i],
                }

                if (req.body.isActivehidden[i] == "on") {
                    item.isActive = 1
                } else {
                    item.isActive = 0
                }

                db.query(SQL, item, (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
            }

        } else {

            let newid = makeid(10)
            while (patients.find(e => e.id_medicine_taken == newid)) {
                newid = makeid(10)
            }


            let item = {
                beneficiary_id: req.body.patientid,
                disease_id: req.body.sicknesspost,
                medicine_id: req.body.medicationpost,
                bought: 0,
                remark: req.body.commentpost,
            }

            if (req.body.isActivehidden == "on") {
                item.isActive = 1
            } else {
                item.isActive = 0
            }

            db.query(SQL, item, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        }
    })
}

function insertMedReceipt(req) {
    return new Promise(async(resolve, reject) => {
        console.log("updating medicationreceipts")
        let SQL = "INSERT into medicationreceipt SET ?"
        let SQL2 = `INSERT into transfer SET ?`

        let temp = {
            currencies: await getCurrencies(),
            transferTypes: await getTransferTypes(),
            medications: await getMedications(),
            sourceCodes: await getSourceCodes(),
        }

        const d = new Date();
        let monthDate = String(d.getMonth() + 1)

        if (monthDate[1] == undefined) {
            monthDate = "0" + String(d.getMonth() + 1)
        }

        let transfers = await getTransfers(temp.currencies.find(e=>e.name_currency == "LBP" || e.name_currency == "Lebanese Pound" || e.symbolCurrency == "L.L").id_currency, {})

        if (req.body.medicationqty > 1) {
            for (let i = 0; i < req.body.medicationqty; i++) {
                
                let item = {
                    receiptMonth: d.getFullYear() + "-" + monthDate,
                    id_medicine: req.body.medicationpost[i],
                    price: 0,
                    sourceCode: req.body.sourcepost[i],
                    id_beneficiary: req.body.patientid,
                    comment: req.body.commentpost[i],
                }

                if(req.body.pricepost[i] != ""){
                    item.price = req.body.pricepost[i]
                }

                

                db.query(SQL, item, async(err, result) => {
                    if (!err) {
                        console.log("added medreceipt")
                        let item2 = {
                            id_currency: temp.currencies.find(e=>e.name_currency == "LBP" || e.name_currency == "Lebanese Pound" || e.symbolCurrency == "L.L").id_currency,
                            transferCode: temp.transferTypes.find(e=> e.transferTitle == "bought medicine").transferCode,
                            transferDate: d.getFullYear() + "-" + monthDate,
                            moneyTransferred: Number(item.price)*-1,
                            balance: 0,
                            id_beneficiary: req.body.patientid,
                            medReceiptID: result.insertId,
                            description: `${temp.sourceCodes.find(e=>e.sourceCode == req.body.sourcepost[i]).sourceName}: ${temp.medications.find(e=>e.id_medicine == req.body.medicationpost[i]).description_medicine}`,
                            transferDateAdded: d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                        }

                        if(req.body.pricepost[i] > 0){
                            item2.balance -= Number(req.body.pricepost[i])
                        }
                        let transfers2 = await getTransfers(temp.currencies.find(e=>e.name_currency == "LBP" || e.name_currency == "Lebanese Pound" || e.symbolCurrency == "L.L").id_currency, {})
                        for(let j=0; j<transfers2.length; j++){
                            item2.balance += Number(transfers2[j].moneyTransferred)
                        }
                        
                        
        
                        db.query(SQL2, item2, (err, result)=>{
                            if(!err){
                                console.log(`inserted new transfer from medRec`)
                                resolve(result)
                            } else {
                                console.log(`error inserting new transfer from medRec: ${err}`)
                                reject(err)
                            }
                        })
                    } else {
                        console.log(`error updating medicationreceipt: ${err}`)
                        reject(err)
                    }
                })
            }

        } else {
            let item = {
                receiptMonth: d.getFullYear() + "-" + monthDate,
                id_medicine: req.body.medicationpost,
                price: 0,
                sourceCode: req.body.sourcepost,
                id_beneficiary: req.body.patientid,
                comment: req.body.commentpost,
            }

            if(req.body.pricepost != ""){
                item.price = req.body.pricepost
            }

            db.query(SQL, item, (err, result) => {
                if (!err) {
                    console.log("added medreceipt")
                    let item2 = {
                        id_currency: temp.currencies.find(e=>e.name_currency == "LBP" || e.name_currency == "Lebanese Pound" || e.symbolCurrency == "L.L").id_currency,
                        transferCode: temp.transferTypes.find(e=> e.transferTitle == "bought medicine").transferCode,
                        transferDate: d.getFullYear() + "-" + monthDate,
                        moneyTransferred: Number(req.body.pricepost)*-1,
                        balance: 0,
                        id_beneficiary: req.body.patientid,
                        medReceiptID: result.insertId,
                        description: `${temp.sourceCodes.find(e=>e.sourceCode == req.body.sourcepost).sourceName}: ${temp.medications.find(e=>e.medicine_id == req.body.medicationpost).medicine_name}`,
                        transferDateAdded: d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                    }

                    for(let i=0; i<transfers.length; i++){
                        item2.balance += Number(transfers[i].moneyTransferred)
                    }
                    if(req.body.pricepost != ""){
                        item2.balance -= Number(req.body.pricepost)
                    }
    
                    db.query(SQL2, item2, (err, result)=>{
                        if(!err){
                            console.log(`inserted new transfer from medRec`)
                            resolve(result)
                        } else {
                            console.log(`error inserting new transfer from medRec: ${err}`)
                            reject(err)
                        }
                    })
                    resolve(result)
                } else {
                    console.log(`error updating medicationreceipt 1: ${err}`)
                    reject(err)
                }
            })
        }

    })

}

function updateMonthlyReceipt(req) {
    return new Promise(async(resolve, reject) => {
        const d = new Date();
        let monthDate = String(d.getMonth() + 1)

        if (monthDate[1] == undefined) {
            monthDate = "0" + String(d.getMonth() + 1)
        }

        let SQL0 = `DELETE from monthlyreceipt where monthlyReceiptID ='${d.getFullYear() + "-" + monthDate}'`
        db.query(SQL0, (err, result) => {
            if (!err) {
                console.log(`deleted, replacing...`)
                resolve(result)
            } else {
                console.log(`error updating monthlyreceipts: ${err}`)
                reject(err)
            }
        })

        let SQL = `INSERT into monthlyreceipt set ?`

        let temp = {
            medReceipts: await getMedicationReceipts(d.getFullYear() + "-" + monthDate),
            sourceCodes: await getSourceCodes(),
        }

        let item = {
            monthlyReceiptID: d.getFullYear() + "-" + monthDate,
            totalMonthlyMedCost: 0,
            totalPharmacyCost: 0,
            totalDispensaryCost: 0,
        }

        for (let i = 0; i < temp.medReceipts.length; i++) {
            if (temp.medReceipts[i].sourceCode == temp.sourceCodes.find(e => e.sourceName == "Donation").sourceCode) {
                continue
            } else if (temp.medReceipts[i].sourceCode == temp.sourceCodes.find(e => e.sourceName == "Dispensary").sourceCode) {
                item.totalDispensaryCost += Number(temp.medReceipts[i].price)
            } else if (temp.medReceipts[i].sourceCode == temp.sourceCodes.find(e => e.sourceName == "Pharmacy").sourceCode) {
                item.totalPharmacyCost += Number(temp.medReceipts[i].price)
            }
        }

        item.totalMonthlyMedCost = item.totalDispensaryCost + item.totalPharmacyCost

        db.query(SQL, item, (err, result) => {
            if (!err) {
                console.log(`replaced.`)
                resolve(result)
            } else {
                console.log(`error replacing: ${err}`)
                reject(err)
            }
        })

    })
}



module.exports = {
    insertMedReceipt,
    deleteAllPatient,
    reInsertPatient,
    updateMonthlyReceipt,
}