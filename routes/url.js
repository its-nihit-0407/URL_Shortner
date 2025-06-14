const URL = require("../models/url");
const express = require("express");
const {handleGenerateShortIdURL} = require("../controllers/url")

const router = express.Router();

router.post("/", handleGenerateShortIdURL)


module.exports = router;    