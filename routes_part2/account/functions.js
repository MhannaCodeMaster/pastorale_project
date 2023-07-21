const { db } = require("../.././databaseInit")
const {
    getTransferTypes,
    getDonators,
    getBeneficiaries,
    getCurrencies,
    makeid,
    getTransfers,
} = require("../.././functions.js")

function addTransfer(req) {
    console.log("adding transfer")
    return new Promise(async(resolve, reject) => {

        let d = new Date()

        let temp = {
            transferTypes: await getTransferTypes(),
            beneficiaries: await getBeneficiaries(),
            donators: await getDonators(),
            transfers : await getTransfers(req.body.currencypost, {})
        }

        let item = {
            transferDate: req.body.datepost,
            transferTime: req.body.timepost,
            transferCode: temp.transferTypes.find(element => element.transferTitle == req.body.transfertypepost).transferCode,
            activityID: undefined,
            moneyTransferred: 0,
            balance: 0,
            id_beneficiary: undefined,
            id_donator: undefined,
            description: req.body.descriptionpost,
            id_currency: req.body.currencypost,
            transferDateAdded: d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        }



        let isGain = temp.transferTypes.find(element => element.transferTitle == req.body.transfertypepost).isGain

        if (req.body.topost) {
            splitTo = req.body.topost.split(" ")
            item.id_beneficiary = temp.beneficiaries.find(element => element.name_beneficiary == splitTo[0] && element.father_name_beneficiary == splitTo[1] && element.family_name_beneficiary == splitTo[2]).id_beneficiary
        } else if (req.body.frompost) {
            item.id_donator = temp.donators.find(element => element.name_donator == req.body.frompost).id_donator
        }

        if (isGain != undefined) {
            if (isGain) {
                item.moneyTransferred += Number(req.body.amountpost)
                item.balance += Number(req.body.amountpost)
            } else {
                item.moneyTransferred -= Number(req.body.amountpost)
                item.balance -= Number(req.body.amountpost)
            }
        }

        for(let i=0; i<temp.transfers.length; i++){
            item.balance += Number(temp.transfers[i].moneyTransferred)
        }
        
        let sql = `INSERT INTO transfer SET ?`
        db.query(sql, item, (err, result) => {
            if (!err) {
                console.log(`inserted data into transfers`)
                resolve(result)
            } else {
                reject(console.log(`Error inserting: ${err}`))
            }
        })
    })
}

function updateCurrency(req) {
    console.log("adding new currency")
    return new Promise(async(resolve, reject) => {
        let currencies = await getCurrencies()
        let item = {
            id_currency: String(currencies.length + 1),
            name_currency: req.body.name_currencypost,
            symbol_currency: req.body.symbol_currencypost,
            precisionIndex: req.body.precisionindexpost,
        }

        let SQL = "INSERT into currency SET ?"
        db.query(SQL, item, (err, result) => {
            if (!err) {
                console.log("added new currency")
                resolve(result)
            } else {
                reject(err)
            }
        })
    })


}

function addTransferType(req) {
    console.log("adding new transferType")
    return new Promise(async(resolve, reject) => {
        
        let tt = await getTransferTypes()
        
        let newID = makeid(5)
        while(tt.find(e=>e.transferCode == newID)){
            newID = makeid(5)
        }

        let item = {
            transferCode: newID,
            transferTitle: req.body.transferTitlepost,
            isGain: req.body.isGainpost,
            hasTo: req.body.hasTopost,
            hasFrom: req.body.hasFrompost,
            isActivity: 0,
        }

        if(req.body.isGainpost == "null"){
            item.isGain = undefined
        }
        if(req.body.hasTopost == "null"){
            item.hasTo = undefined
        }
        if(req.body.hasFrompost == "null"){
            item.hasFrom = undefined
        }

        let SQL = "INSERT into transfertype SET ?"
        db.query(SQL, item, (err, result) => {
            if (!err) {
                console.log("added new transfertype")
                resolve(result)
            } else {
                console.log(err)
                reject(err)
            }
        })
    })


}

function addExchange(req){
    return new Promise(async(resolve, reject)=>{
         let SQL = "insert into transfer set ?"

         let d = new Date()

         let temp = {
            transferTypes : await getTransferTypes(),
            transfers1: await getTransfers(req.body.fromcurrencypost, {}),
            transfers2: await getTransfers(req.body.tocurrencypost, {})
         }

        let item1 = {
            transferDate: req.body.datepost,
            transferTime: req.body.timepost,
            transferCode: temp.transferTypes.find(element => element.transferTitle == req.body.transfertypepost).transferCode,
            activityID: undefined,
            moneyTransferred: 0,
            balance: 0,
            id_beneficiary: undefined,
            id_donator: undefined,
            description: req.body.descriptionpost,
            id_currency: req.body.fromcurrencypost,
            transferDateAdded: d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        }

        for(let i=0; i<temp.transfers1.length; i++){
            item1.balance += Number(temp.transfers1[i].moneyTransferred)
        }
        item1.balance -= Number(req.body.fromamountpost)

        item1.moneyTransferred -= Number(req.body.fromamountpost)

        let item2 = {
            transferDate: req.body.datepost,
            transferTime: req.body.timepost,
            transferCode: temp.transferTypes.find(element => element.transferTitle == req.body.transfertypepost).transferCode,
            activityID: undefined,
            moneyTransferred: 0,
            balance: 0,
            id_beneficiary: undefined,
            id_donator: undefined,
            description: req.body.descriptionpost,
            id_currency: req.body.tocurrencypost,
            transferDateAdded: d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        }

        for(let i=0; i<temp.transfers2.length; i++){
            item2.balance += Number(temp.transfers2[i].moneyTransferred)
        }
        item2.balance += Number(req.body.toamountpost)

        item2.moneyTransferred += Number(req.body.toamountpost)

        db.query(SQL, item1, (err, result) => {
            if (!err) {
                console.log(`inserted exchange from into transfers`)
                db.query(SQL, item2, (err, result) => {
                    if (!err) {
                        console.log(`inserted exchange to into transfers`)
                        resolve(result)
                    } else {
                        reject(console.log(`Error inserting exchange to: ${err}`))
                    }
                })
            } else {
                reject(console.log(`Error inserting exchange from: ${err}`))
            }
        })

        
    })
   
}

module.exports = {
    addTransfer,
    updateCurrency,
    addTransferType,
    addExchange
}