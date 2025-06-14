const express = require("express");
const {handleConnectDB} = require("./connection")
const {handleReqResLogs} = require("./middlewares/index")
const URL = require("./models/url")
const urlRouter = require("./routes/url")

const app = express();
const PORT = 8001;

handleConnectDB("mongodb://127.0.0.1:27017/url_shortner").then(() => console.log("DB connected")).catch((err) => console.log(err));

app.use(express.json())

// logs
app.use(handleReqResLogs("logs/url_shortner.log"));

// router
app.use("/url", urlRouter)

app.get("/", (req, res) => res.json({msg: "hi"}))

app.get("/url/:shortid", async (req, res) => {
    const shortid = req.params.shortid
    if (!shortid) return res.status(401).json({msg: "shortId is required"});

    const result = await URL.findOneAndUpdate({
        shortid: shortid,
    }, {
        $push: {
            visitHistory: {
                timeStamp: Date.now()
            }
        }
    })
    if (!result) {
        return res.status(404).json({ msg: "URL not found for given shortId" });
    }

    res.redirect(result.redirectUrl);
})

app.listen(PORT, () => {
    console.log(`Sever started at port ${PORT}`);
})