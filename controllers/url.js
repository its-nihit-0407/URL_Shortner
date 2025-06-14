const shortid = require("shortid");
const URL = require("../models/url")


async function handleGenerateShortIdURL(req, res) {
    const body = req.body
    console.log(body)

    if (!body.url) return res.status(400).json({msg: "url not provided"})

    const short_id = shortid.generate();

    await URL.create({
        shortid: short_id,
        redirectUrl: body.url,
        visitHistory: [],
    })
    return res.status(200).json({ id: short_id })
}

module.exports = {
    handleGenerateShortIdURL,
}