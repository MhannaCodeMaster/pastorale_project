const express = require("express")
const router = express.Router()

router.route("/").all((req, res) => {
    res.redirect("/api/homepage")
})

module.exports = router