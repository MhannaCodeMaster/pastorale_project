const express = require("express")
const router = express.Router()
const { getMedicationReceipts, getMedications, getSourceCodes, getCurrencies, getsicknesses, getPatients, getBeneficiaries, getMonthlyReceipts, } = require("../../functions.js")
const { deleteAllPatient, reInsertPatient, insertMedReceipt, updateMonthlyReceipt } = require("./functions")


router.route("/").get(async(req, res) => {

    if (req.query.month == undefined) {
        const d = new Date();
        let monthDate = String(d.getMonth() + 1)

        if (monthDate[1] == undefined) {
            monthDate = "0" + String(d.getMonth() + 1)
        }
        res.redirect(`/medicine/?month=${d.getFullYear() + "-" + monthDate}`)
        return
    }
    
    try {

        conditions = {}

        if(req.query.month){
            conditions.month = req.query.month
        }
        if(req.query.medicine){
            conditions.medicine = req.query.medicine
        }
        if(req.query.beneficiary){
            conditions.beneficiary = req.query.beneficiary
        }
        if(req.query.source){
            conditions.source = req.query.source
        }

        var data = {
            sourceCodes: await getSourceCodes(),
            currencies: await getCurrencies(),
            beneficiaries: await getBeneficiaries(),
            medications: await getMedications(),
            medReceipts: await getMedicationReceipts(conditions),
            monthlyReceipts: await getMonthlyReceipts(req.query.month),
            queries: req.query,
        }
    
    } catch {
        res.render("./routes_part2/errorReject/index.ejs")
        return
    }

    res.render("./routes_part2/medicine/index.ejs", data)
    return
})

router.route("/patients").get(async(req, res) => {

    try {
        
        var data = {
            beneficiaries: await getBeneficiaries(),
            medications: await getMedications(),
            patients: await getPatients(),
            sicknesses: await getsicknesses(),
            queries: req.query,
        }

    } catch {
        res.render("./routes_part2/errorReject/index.ejs")
    }

    res.render("./routes_part2/medicine/patients/index.ejs", data)
})

router.route("/patients").post(async(req, res) => {

    console.log(req.body)

    await deleteAllPatient(req.query.patientid)

    if (req.body.sicknesspost != undefined && req.body.medicationpost != undefined) {
        await reInsertPatient(req)
    }

    res.redirect(`/medicine/`)
})

router.route("/addMedicationReceipt").get(async(req, res) => {

    try {

        var data = {
            sourceCodes: await getSourceCodes(),
            currencies: await getCurrencies(),
            beneficiaries: await getBeneficiaries(),
            medications: await getMedications(),
            patients: await getPatients(),
            queries: req.query,
        }

    } catch {
        res.render("./routes_part2/errorReject/index.ejs")
        return
    }
    
    res.render("./routes_part2/medicine/addMedicationReceipt/index.ejs", data)
})

router.route("/addMedicationReceipt").post(async(req, res) => {

    console.log(req.body)
    try {

        await insertMedReceipt(req)
        await updateMonthlyReceipt(req) 

    } catch {
        res.render("./routes_part2/errorReject/index.ejs")
        return
    }
    
    res.redirect("/medicine")

})

module.exports = router