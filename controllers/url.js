const shortid = require("shortid");
const URL = require("../models/url")


async function handleGenerateShortIdURL(req, res) {
    const body = req.body
    // console.log(body)

    if (!body.url ) return res.status(400).json({msg: "url not provided"})

    const short_id = shortid.generate();
    // const allurl = await URL.find({})
    

    await URL.create({
        shortid: short_id,
        redirectUrl: body.url,
        visitHistory: [],
        createdby: req.user._id
    })

    return res.render("index", {
        id: short_id,
    })
    // return res.status(200).json({ id: short_id })
}

async function handleClicks(req, res) {
    const id = req.params.shortid;
    
    if (!id) return res.status(401).json({msg: "Id is required"});
    const result = await URL.findOne({shortid: id})

    return res.status(200).json({TotalClicks: result.visitHistory.length})
}

module.exports = {
    handleGenerateShortIdURL,
    handleClicks,
}