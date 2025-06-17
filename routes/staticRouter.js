const express = require("express");
const ejs = require("ejs")
const URL = require("../models/url")
const {restrictTo} = require("../middlewares/auth")

const router = express.Router();

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    // console.log(res.user)
    // if (!req.user) return res.redirect("/login"); 
    const allurl = await URL.find({createdby: req.user._id});

    return res.render("index", {
        urls: allurl,
    })
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get("/login", (req, res) => {
    res.render("login")
})

module.exports = router;    