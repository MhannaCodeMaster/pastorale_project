const express = require("express")
const router = express.Router()
const { addActivity, addActivityTransactions, addActivityTransfer } = require("./functions")
const {
    getActivities,
    getActivityTransactions,
    updateAccounts
} = require("../../functions.js")

router.route("/").get(async(req, res) => {

    if (req.query.month == undefined) {
        const d = new Date();
        let monthDate = String(d.getMonth() + 1)

        if (monthDate[1] == undefined) {
            monthDate = "0" + String(d.getMonth() + 1)
        }
        res.redirect(`activities/?month=${d.getFullYear() + "-" + monthDate}`)
        return
    }

    try {

        var data = {
            activities: await getActivities(req),
            queries: req.query
        }

        res.render("../../view/routes_part2/activities/index.ejs", data)
        return

    } catch {
        res.render("routes_part2/errorReject/index.ejs")
        return
    }
})

router.route("/details").get(async(req, res) => {

    try {
        
        var data = {
            queries: req.query,
            activities: await getActivities(req),
            transactions: await getActivityTransactions(req.query.activityid),
        }

        res.render("../../view/routes_part2/activities/details/index.ejs", data)
        return

    } catch {
        res.render("routes_part2/errorReject/index.ejs")
        return
    }
})

router.route("/addActivity").get((req, res) => {

    res.render("../../view/routes_part2/activities/addActivity/index.ejs")
})

router.route("/addActivity").post(async(req, res) => {

    try {
        var data = {}

        await addActivity(req).then(dataa => data = dataa)
        await addActivityTransactions(req, data)
        await addActivityTransfer(req, data)
        await updateAccounts()

        res.redirect("/activities")
        return

    } catch {
        res.render("routes_part2/errorReject/index.ejs")
        return
    }
})

module.exports = router