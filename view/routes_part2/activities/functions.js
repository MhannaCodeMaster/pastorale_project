const { db } = require("../.././databaseInit")
const { getTransferTypes, getCurrencies, getTransfers } = require("../.././functions.js")


function addActivity(req) {
    return new Promise(async(resolve, reject) => {
        console.log("adding activity")
    
        var item = {
            activityDate: req.body.datepost,
            activityProfit: 0,
            activityTitle: req.body.titlepost,
            totalCredit: 0,
            totalDebit: 0,
        }

        if (req.body.transactionqty > 1) {
            for (let i = 0; i < req.body.descriptionpost.length; i++) {
                if (req.body.descriptionpost[i] == undefined || (req.body.debitpost[i] == undefined && req.body.creditpost[i] == undefined)) {
                    continue
                }
                if (req.body.creditpost[i] != undefined) {
                    item.totalCredit += Number(req.body.creditpost[i])
                }
                if (req.body.debitpost[i] != undefined) {
                    item.totalDebit += Number(req.body.debitpost[i])
                }
            }
        } else {
            item.totalCredit += Number(req.body.creditpost)
            item.totalDebit += Number(req.body.debitpost)
        }

        item.activityProfit = item.totalCredit - item.totalDebit
        let sql = "INSERT into activity SET ?"
        db.query(sql, item, (err, result) => {
            if (!err) {
                resolve({ id: result.insertId, amount: item.activityProfit })
            } else {
                console.log(err)
                reject(err)
            }
        })


    })
}

function addActivityTransactions(req, data) {
    return new Promise((resolve, reject) => {
        console.log("adding transactions")
        let item2 = {
            activityID: data.id,
            credit: 0,
            debit: 0,
            total: 0,
            description: "",
            comment: undefined,
        }

        if (req.body.transactionqty > 1) {
            for (let i = 0; i < req.body.descriptionpost.length; i++) {

                if (req.body.creditpost[i] != undefined) {
                    item2.credit = Number(req.body.creditpost[i])
                }
                if (req.body.debitpost[i] != undefined) {
                    item2.debit = Number(req.body.debitpost[i])
                }
                item2.total = item2.credit - item2.debit
                item2.description = req.body.descriptionpost[i]
                item2.comment = req.body.commentpost[i]

                if (item2.credit == 0 && item2.debit == 0) {
                    continue
                }

                let sql2 = "INSERT into activitytransaction SET ?"
                db.query(sql2, item2, (err, result) => {
                    if (!err) {
                        resolve({ id: data.id, amount: data.amount })
                    } else {
                        console.log(err)
                        reject(err)
                    }
                })
            }
        } else {
            item2.credit = Number(req.body.creditpost)
            item2.debit = Number(req.body.debitpost)
            item2.total = item2.credit - item2.debit
            item2.description = req.body.descriptionpost
            item2.comment = req.body.commentpost
            let sql2 = "INSERT into activitytransaction SET ?"
            db.query(sql2, item2, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    console.log(err)
                    reject(err)
                }
            })
        }
    })
}

function addActivityTransfer(req, data) {
    return new Promise(async(resolve, reject) => {

        let d = new Date()
        console.log("adding into transfer")

        let temp = {
            currencies: await getCurrencies(),
            transferTypes: await getTransferTypes(), 
        }

        let transfers = await getTransfers(temp.currencies.find(e => e.name_currency == "LBP" || e.name_currency == "Lebanese Pound" || e.symbol_currency == "L.L").id_currency, {})

        let item = {
            transferDate: req.body.datepost,
            transferCode: temp.transferTypes.find(element => element.isActivity == 1).transferCode, //??? if broken means from here
            activityID: data.id,
            moneyTransferred: data.amount,
            balance: 0,
            description: req.body.titlepost,
            id_currency: temp.currencies.find(e => e.name_currency == "LBP" || e.name_currency == "Lebanese Pound" || e.symbol_currency == "L.L").id_currency,
            transferDateAdded: d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        }

        for(let i=0; i<transfers.length; i++){
            item.balance += transfers[i].moneyTransferred
        }
        item.balance += data.amount

        let sql = "INSERT into transfer SET ?"
        db.query(sql, item, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                console.log(`error inserting activity into LBP transfers: ${err}`)
                reject(err)
            }
        })

    })
}


module.exports = {
    addActivity,
    addActivityTransactions,
    addActivityTransfer,
}