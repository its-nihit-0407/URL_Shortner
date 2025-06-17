const URL = require("../models/url");
const express = require("express");
const {handleGenerateShortIdURL, handleClicks} = require("../controllers/url")


const router = express.Router();

router.post("/", handleGenerateShortIdURL)

router.get("/analytics/:shortid", handleClicks)

module.exports = router;    