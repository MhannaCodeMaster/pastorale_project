const express = require("express")
const router = express.Router()
const { addTransfer, updateCurrency, addTransferType, addExchange } = require("./functions")
const {
    getAccountTotals,
    getActivities,
    getCurrencies,
    getTransferTypes,
    getTransfers,
    updateAccounts,
    getBeneficiaries,
    getDonators
} = require("../../functions.js")


router.route("/").get(async(req, res) => {

    console.log(req.query)
    
    try {

        let conditions = {}
        
        let currencies = await getCurrencies() 

        const d = new Date();
        let monthDate = String(d.getMonth() + 1)

        if (monthDate[1] == undefined) {
            monthDate = "0" + String(d.getMonth() + 1)
        }
        let month = d.getFullYear() + "-" + monthDate


        if (req.query.id_currency == null || currencies.find(element => element.id_currency == req.query.id_currency) == null || req.query.month == null) {

            if(currencies.find(e=> e.name_currency == "LBP" || e.name_currency == "Lebanese Pound" || e.symbol_currency == "L.L" || e.symbol_currency == "LBP")){
                res.redirect(`/account/?id_currency=${currencies.find(e=> e.name_currency == "LBP" || e.name_currency == "Lebanese Pound" || e.symbol_currency == "L.L" || e.symbol_currency == "LBP").id_currency}&month=${month}`)
                console.log("no specified currency or unknown ID, redirecting to LBP")
                return
            }

            res.redirect(`/account/?id_currency=${currencies[0].id_currency}&month=${month}`)
            console.log("no specified currency or unknown ID, redirecting")
            return
        }

            if (req.query.month) {
                conditions.month = req.query.month
            }
            if (req.query.isGain == "gain") {
                conditions.isGain = 1
            }
            if (req.query.isGain == "loss") {
                conditions.isLoss = 1
            }
            if (req.query.transferType){
                conditions.transferType = req.query.transferType
            }
            if (req.query.person){
                conditions.person = req.query.person
            }

        var data = {
            queries: {},
            currencies: currencies,
            transfers: await getTransfers(req.query.id_currency, conditions),
            transferTypes: await getTransferTypes(),
            beneficiaries: await getBeneficiaries(),
            donators: await getDonators(),
            activities: await getActivities(req),
            accountTotals: await getAccountTotals(),
        }

        data.queries = req.query

    } catch {
        res.render("./routes_part2/errorReject/index.ejs")
        return
    }

    res.render("./routes_part2/account/index.ejs", data)

    return
})

router.route("/addTransfer").get(async(req, res) => {
    try {

        let currencies = await getCurrencies()        

        if (req.query.id_currency == null || currencies.find(element => element.id_currency == req.query.id_currency) == null) {
            res.redirect(`/account/?id_currency=${currencies[0].id_currency}`)
            console.log("no specified currency or unknown ID, redirecting")
        }

        var data = {
            queries: {},
            currencies: currencies,
            transferTypes: await getTransferTypes(),
            beneficiaries:  await getBeneficiaries(),
            donators: await getDonators(),
            activities: await getActivities(req),
            error: 0,
        }
        
        data.queries = req.query

    } catch {
        res.render("./routes_part2/errorReject/index.ejs")
        return
    }

    res.render("./routes_part2/account/addTransfer/index.ejs", data)
    return
})

router.route("./addTransfer").post(async(req, res) => {

    try {
        await addTransfer(req)
        await updateAccounts()

        res.redirect(`/account/?id_currency=${req.body.currencypost}`)
        return

    } catch {
        res.render("./routes_part2/errorReject/index.ejs")
        return
    }

})

router.route("/addCurrency").get(async(req, res) => {
    res.render("./routes_part2/account/addCurrency/index.ejs")
})

router.route("/addCurrency").post(async(req, res) => {

    try {
        await updateCurrency(req)
        res.redirect("/account")
        return
    } catch {
        res.render("./routes_part2/errorReject/index.ejs")
        return
    }
})

router.route("/addTransferType").get(async(req, res) => {
    res.render("./routes_part2/account/addTransferType/index.ejs")
})

router.route("/addTransferType").post(async(req, res) => {
    try {
        await addTransferType(req)
        res.redirect("/account")
        return
    } catch {
        res.render("./routes_part2/errorReject/index.ejs")
        return
    }
})

router.route("/addTransfer/exchange").get(async(req, res) => {

    let data = {
        currencies: await getCurrencies(),
        transferTypes: await getTransferTypes(),
        queries: req.query,
    }

    res.render("./routes_part2/account/addTransfer/exchange/index.ejs", data)
})

router.route("/addTransfer/exchange").post(async(req, res) => {

    console.log(req.body)
    try{
        await addExchange(req)
        await updateAccounts()
    } catch {
        res.render("./routes_part2/errorReject/index.ejs")
        return
    }
    
    res.redirect("/account")
    return
})

module.exports = router