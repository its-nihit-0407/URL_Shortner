const express = require("express");
const URL = require("../models/url")

const router = express.Router()

router.get("/urls", async (req, res) => {
    const alllinks = await URL.find({})

    console.log(req.path)
    res.render("index", {
        urls: alllinks,
        path: req.path
    })

})

module.exports = router
