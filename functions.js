const { db } = require("./databaseInit")

function getActivities(req) {
    return new Promise((resolve, reject) => {
        let SQL = "SELECT * from activity" //------------GET ACITIVITIES
        if(req.query.month){
            SQL += ` WHERE activityDate REGEXP '^${req.query.month}'`
        }
        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log("fetched activities")
                resolve(results)
                return
            } else {
                console.log("error fetching Activities")
                reject(err)
                return
            }
        })
    })
}

function getCurrencies() {
    return new Promise((resolve, reject) => {
        let SQL = "SELECT * from currency" //--------GET CURRENCIES
        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log("fetched currencies")
                resolve(results)
                return
            } else {
                console.log("error fetching currencies")
                reject(err)
                return
            }
        })
    })

}

function getAccounts() {
    return new Promise((resolve, reject) => {
        //console.log("getAccounts");
        let SQL = "SELECT * from account" //------------GET ACCOUNTS
        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log("fetched accounts")
                resolve(results)
                return
            } else {
                console.log("error fetching accounts")
                reject(err)
                return
            }
        })
    })
}

function getTransfers(curid, conditions) {
    return new Promise((resolve, reject) => {
        let SQL = ``
        if (curid == "all") {
            SQL = `SELECT * from transfer WHERE transferID != -1`
        } else {
            SQL = `SELECT * from transfer WHERE id_currency = '${curid}'`
        }

        if (conditions.month) {
            SQL += ` AND transferdate REGEXP '^${conditions.month}'`
        }
        if (conditions.isGain == 1) {
            SQL += ` AND moneyTransferred >= 0`
        }
        if (conditions.isLoss == 1) {
            SQL += ` AND moneyTransferred < 0`
        }
        if (conditions.transferType) {
            SQL += ` AND transferCode = '${conditions.transferType}'`
        }
        if (conditions.person) {
            SQL += ` AND id_beneficiary = '${conditions.person}'`
            SQL += ` OR id_donator = '${conditions.person}'`

        }
        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log("fetched transfers")
                resolve(results)
                return
            } else {
                console.log(`error fetching transfers: ${err}`)
                reject(err)
                return
            }
        })
    })
}

function addLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function getTransfersExport(from, to) {
    return new Promise((resolve, reject) => {
        let SQL = `SELECT * from transfer WHERE transferID != -1`

        if(from && to){
            SQL = `SELECT * from transfer WHERE transferDate REGEXP '^${from}'`
            fromArray = from.split("-")
            toArray = to.split("-")
            fromArray[0] = Number(fromArray[0])
            fromArray[1] = Number(fromArray[1])
            toArray[0] = Number(toArray[0])
            toArray[1] = Number(toArray[1])
            var DatesToDo = []

            if(toArray[0] > fromArray[0]){
                
                let fromYear = fromArray[0]
                let toYear = toArray[0]

                for(let i=0; fromArray[1]+i<=12; i++){
                    DatesToDo.push(`${fromArray[0]}-${addLeadingZeros(Number(fromArray[1]+i), 2)}`)
                }
                fromYear++
                for(let j=0; fromYear<toYear;j++){
                    for(let i=1; i<=12; i++){
                        DatesToDo.push(`${fromYear}-${addLeadingZeros(Number(i), 2)}`)
                    }
                fromYear++
                }
                for(let i=0; i<toArray[1]; i++){
                    DatesToDo.push(`${toArray[0]}-${addLeadingZeros(Number(i+1), 2)}`)
                }

                for(let i=1; i<DatesToDo.length; i++){
                    SQL += ` OR transferDate REGEXP '^${DatesToDo[i]}'`
                }
            } else if(toArray[0] == fromArray[0]){
                for(let i=0; fromArray[1]+i<=toArray[1]; i++){
                    DatesToDo.push(`${fromArray[0]}-${addLeadingZeros(Number(fromArray[1]+i), 2)}`)
                }
                for(let i=1; i<DatesToDo.length; i++){
                    SQL += ` OR transferDate REGEXP '^${DatesToDo[i]}'`
                }
            }
            

        }

        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log("fetched transfers")
                resolve(results)
                return
            } else {
                console.log(`error fetching transfers: ${err}`)
                reject(err)
                return
            }
        })
    })
}

function getActivitiesExport(from, to, activities){
    return new Promise((resolve, reject) => {
        let SQL = "SELECT * from activity WHERE activityID != -1" //------------GET ACITIVITIES

        if(from && to){
            SQL = `SELECT * from activity WHERE activityDate REGEXP '^${from}'`
            fromArray = from.split("-")
            toArray = to.split("-")
            fromArray[0] = Number(fromArray[0])
            fromArray[1] = Number(fromArray[1])
            toArray[0] = Number(toArray[0])
            toArray[1] = Number(toArray[1])
            var DatesToDo = []

            if(toArray[0] > fromArray[0]){
                
                let fromYear = fromArray[0]
                let toYear = toArray[0]

                for(let i=0; fromArray[1]+i<=12; i++){
                    DatesToDo.push(`${fromArray[0]}-${addLeadingZeros(Number(fromArray[1]+i), 2)}`)
                }
                fromYear++
                for(let j=0; fromYear<toYear;j++){
                    for(let i=1; i<=12; i++){
                        DatesToDo.push(`${fromYear}-${addLeadingZeros(Number(i), 2)}`)
                    }
                fromYear++
                }
                for(let i=0; i<toArray[1]; i++){
                    DatesToDo.push(`${toArray[0]}-${addLeadingZeros(Number(i+1), 2)}`)
                }
                for(let i=1; i<DatesToDo.length; i++){
                    SQL += ` OR activityDate REGEXP '^${DatesToDo[i]}'`
                }
            } else if(toArray[0] == fromArray[0]){
                for(let i=0; fromArray[1]+i<=toArray[1]; i++){
                    DatesToDo.push(`${fromArray[0]}-${addLeadingZeros(Number(fromArray[1]+i), 2)}`)
                }
                for(let i=1; i<DatesToDo.length; i++){
                    SQL += ` OR activityDate REGEXP '^${DatesToDo[i]}'`
                }
            }
        }

        if(activities){
            SQL = `SELECT * from activity WHERE activityID = '${activities}'`
        }

        console.log(SQL)
            db.query(SQL, (err, results) => {
                if (results && !err) {
                    console.log("fetched activities")
                    resolve(results)
                    return
                } else {
                    console.log("error fetching Activities")
                    reject(err)
                    return
                }
            })
    })
}   

function getTransferTypes() {
    return new Promise((resolve, reject) => {
        let SQL = "SELECT * from transfertype ORDER BY transferTitle ASC" // ----------GET TRANSFER TYPES
        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log("fetched transfertypes")
                resolve(results)
                return
            } else {
                console.log("error fetching TransferTypes")
                reject(err)
                return
            }
        })
    })

}

function getBeneficiaries() {
    return new Promise((resolve, reject) => {

        let SQL = "SELECT * from beneficiary ORDER BY first_name ASC" //------------GET PEOPLE

        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log("fetched beneficiaries")
                resolve(results)
                return
            } else {
                console.log("error fetching beneficiaries")
                reject(err)
                return
            }
        })

    })
}

function getDonators() {
    return new Promise((resolve, reject) => {
        let SQL = "SELECT * from donator ORDER BY name_donator ASC" //------------GET PEOPLE
        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log("fetched donators")
                resolve(results)
                return
            } else {
                console.log("error fetching donators")
                reject(err)
                return
            }
        })
    })
}

function getAccountTotals() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * from account"
        db.query(sql, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                console.log("error fetching account totals")
                reject(err)
            }
        })
    })
}

function getActivityTransactions(id) {
    return new Promise((resolve, reject) => {
        let SQL = `SELECT * from activitytransaction WHERE activityID = '${id}'` //------------GET TRANSACTIONS
        
        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log(`fetched activity details`)
                resolve(results)
            } else {
                console.log(`Error fetching activitytransactions`)
                reject(err)
            }
        })
    })
}

function updateAccounts() {
    console.log("updating accounts")
    return new Promise(async(resolve, reject) => {

        let currencies = await getCurrencies()

        for (var i = 0; i < currencies.length; i++) {

            await new Promise((resolve, reject) => {
                let SQL = `SELECT * from account WHERE id_currency = '${currencies[i].id_currency}'`
                db.query(SQL, (err, results) => {
                    if (!err && results.length == 0) {
                        console.log(`Creating new account ${results.length}`)
                        let item = {
                            id_currency: currencies[i].id_currency,
                            totalBalance: 0,
                        }
                        let SQL2 = `INSERT INTO account set ?`
                        db.query(SQL2, item, (err, result) => {
                            if (!err) {
                                resolve(console.log(`created new account.`))
                            } else {
                                reject(console.log(`error creating new account: ${err}`))
                            }
                        })
                    } else {
                        resolve()
                    }
                })
            })

            let allTransfers = await getTransfers("all", {})
            const transferArray = allTransfers.filter(element => element.id_currency == currencies[i].id_currency)
            var total = 0
            for (let j = 0; j < transferArray.length; j++) {
                total += transferArray[j].moneyTransferred
            }
            let SQL2 = `UPDATE account SET totalBalance = '${ total }' WHERE account.id_currency = '${currencies[i].id_currency}'`
            db.query(SQL2, (err, result) => {
                if (!err) {
                    resolve(console.log("updated accounts"))
                } else {
                    reject(console.log(`error updating accounts: ${err}`))
                }
            })
        }
    })
}

function getMedications() {
    return new Promise((resolve, reject) => {
        let SQL = "SELECT * from medication ORDER BY medicine_name ASC" //------------GET MEDS 
        db.query(SQL, (err, results) => {
            if (!err) {
                console.log("fetched medications")
                resolve(results)
                return
            } else {
                console.log(`Error fetching medication`)
                reject(err)
            }
        })
    })
}

function getMedicationReceipts(conditions) {
    return new Promise((resolve, reject) => {
        let SQL = `SELECT * from medicationreceipt WHERE receiptID != '-1'`

        if (conditions.month) {
            SQL += ` AND receiptmonth REGEXP '^${conditions.month}'`
        }
        if (conditions.medicine) {
            SQL += ` AND id_medicine = '${conditions.medicine}'`
        }
        if (conditions.beneficiary) {
            SQL += ` AND id_beneficiary = '${conditions.beneficiary}'`
        }
        if (conditions.source) {
            SQL += ` AND sourceCode = '${conditions.source}'`
        }

        

        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log(`fetched medication receipts for ${conditions.month}`)
                resolve(results)
                return
            } else {
                console.log(err)
                reject(err)
            }
        })
    })
}

function getMedicationReceiptsExport(from, to) {
    return new Promise((resolve, reject) => {
        let SQL = `SELECT * from medicationReceipt WHERE receiptID != '-1'`

        if(from && to){
            SQL = `SELECT * from medicationReceipt WHERE receiptMonth REGEXP '^${from}'`
            fromArray = from.split("-")
            toArray = to.split("-")
            fromArray[0] = Number(fromArray[0])
            fromArray[1] = Number(fromArray[1])
            toArray[0] = Number(toArray[0])
            toArray[1] = Number(toArray[1])
            var DatesToDo = []

            if(toArray[0] > fromArray[0]){
                
                let fromYear = fromArray[0]
                let toYear = toArray[0]

                for(let i=0; fromArray[1]+i<=12; i++){
                    DatesToDo.push(`${fromArray[0]}-${addLeadingZeros(Number(fromArray[1]+i), 2)}`)
                }
                fromYear++
                for(let j=0; fromYear<toYear;j++){
                    for(let i=1; i<=12; i++){
                        DatesToDo.push(`${fromYear}-${addLeadingZeros(Number(i), 2)}`)
                    }
                fromYear++
                }
                for(let i=0; i<toArray[1]; i++){
                    DatesToDo.push(`${toArray[0]}-${addLeadingZeros(Number(i+1), 2)}`)
                }
                for(let i=1; i<DatesToDo.length; i++){
                    SQL += ` OR receiptMonth REGEXP '^${DatesToDo[i]}'`
                }
            } else if(toArray[0] == fromArray[0]){
                for(let i=0; fromArray[1]+i<=toArray[1]; i++){
                    DatesToDo.push(`${fromArray[0]}-${addLeadingZeros(Number(fromArray[1]+i), 2)}`)
                }
                for(let i=1; i<DatesToDo.length; i++){
                    SQL += ` OR receiptMonth REGEXP '^${DatesToDo[i]}'`
                }
            }
            

        }
        SQL += " ORDER BY receiptMonth ASC"

        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log("fetched medication receipts")
                resolve(results)
                return
            } else {
                console.log(`error medication receipts: ${err}`)
                reject(err)
                return
            }
        })
    })
}

function getSourceCodes() {
    return new Promise((resolve, reject) => {
        let SQL = "SELECT * from source ORDER BY sourceName ASC" //------------GET SOURCECODES 
        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log(`fetched sourcecodes`)
                resolve(results)
                return
            } else {
                console.log(`Error fetching source`)
                reject(err)
            }
        })
    })
}

function getsicknesses() {
    return new Promise((resolve, reject) => {
        let SQL = "SELECT * from disease" //------------GET sickness 
        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log("fetched disease")
                resolve(results)
                return
            } else {
                console.log(`Error fetching disease`)
                reject(err)
            }
        })
    })
}

function getPatients() {
    return new Promise((resolve, reject) => {
        let SQL = "SELECT * from health_situation ORDER BY bought DESC" //------------GET PATIENT 
        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log("fetched patients")
                resolve(results)
                return
            } else {
                console.log(`Error fetching patients`)
                reject(err)
            }
        })
    })
}

function getMonthlyReceipts(date){
    return new Promise((resolve, reject) => {
        let SQL = `SELECT * from monthlyreceipt WHERE monthlyReceiptID = '${date}'` 
        db.query(SQL, (err, results) => {
            if (results && !err) {
                console.log(`fetched monhtly receipts`)
                resolve(results)
                return
            } else {
                console.log(`Error fetching monthlyReceipts`)
                reject(err)
            }
        })
    })
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}



module.exports = {
    getAccountTotals,
    getActivitiesExport,
    getAccounts,
    getActivities,
    getActivityTransactions,
    getCurrencies,
    getBeneficiaries,
    getDonators,
    getTransferTypes,
    getTransfers,
    updateAccounts,
    getMedicationReceipts,
    getMedicationReceiptsExport,
    getMedications,
    getSourceCodes,
    getsicknesses,
    getPatients,
    getMonthlyReceipts,
    getTransfersExport,
    makeid,
}