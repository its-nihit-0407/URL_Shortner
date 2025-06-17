const JWT = require("jsonwebtoken")
const secert = "283472834"

function setUser(user) {
    return JWT.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secert)
}

function getUser(token) {
    try{
        if (!token) return null;
        return JWT.verify(token, secert)    

    }catch(err) {
        return null
    }
}

module.exports = {
    setUser,
    getUser
}