const express = require("express");
const {handleCreateUser, handleLoginRequest} = require("../controllers/user")



const router = express.Router();

router.post("/", handleCreateUser)

router.post("/login", handleLoginRequest)

// router.get("/", (req, res) => {
//     res.render("index")
// })

module.exports = router;