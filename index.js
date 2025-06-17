const express = require("express");
const {handleConnectDB} = require("./connection")
const {handleReqResLogs} = require("./middlewares/index")
const URL = require("./models/url")
const urlRouter = require("./routes/url")
const staticRouter = require("./routes/staticRouter")
const ejs = require("ejs")
const path = require("path")
const UserRouter = require("./routes/user")
const cookieParser = require("cookie-parser")
const {checkAutheticatedUser, restrictTo} = require("./middlewares/auth")
const AdminRouter = require("./routes/AdminRouter")

const app = express();
const PORT = 8001;

handleConnectDB("mongodb://127.0.0.1:27017/url_shortner").then(() => console.log("DB connected")).catch((err) => console.log(err));

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

// logs
app.use(handleReqResLogs("logs/url_shortner.log"));
app.use(checkAutheticatedUser)

// routes
app.use("/", staticRouter)
app.use("/admin", restrictTo(["ADMIN"]),AdminRouter)
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter)
app.use("/user", UserRouter)

// app.get("/", (req, res) => res.json({msg: "hi"}))

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