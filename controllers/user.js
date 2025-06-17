const User = require("../models/user")
const {v4: uuidv4} = require("uuid")
const {getUser, setUser} = require("../services/auth")


async function handleCreateUser(req, res) {
    try{
        const {name, email, password} = req.body
        
        const user = User.findOne({email})

        // if (user) return res.redirect("/signup")
 
        User.create({
            name: name,
            email: email,
            password: password,
        })
    }catch(err) {
        return res.redirect("/signup")
    }

    return res.redirect("/login")

}

async function handleLoginRequest(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password})

    
    if (!user) return res.render("login", {
        error: "Invalid Username or password"
    });
    
    const token = setUser(user)
    res.cookie("token", token)
    return res.redirect("/")

}

module.exports = {
    handleCreateUser,
    handleLoginRequest,
}