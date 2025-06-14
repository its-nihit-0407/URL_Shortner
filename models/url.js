const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortid: {
        type: String,
        required: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timeStamp: {
                type: Number
            }
        } 
    ]
}, {timestamps: true})

const URL = mongoose.model("url_shortner", urlSchema)

module.exports = URL;