const express = require("express")
const router = express.Router()
let {connectDB, db} = require("../../databaseInit")


router.route("/").get(async(req, res) => {
    
    res.status(200).render('routes/homepage/index.ejs')
    return
})


module.exports = router