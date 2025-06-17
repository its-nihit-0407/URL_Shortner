const {getUser} = require("../services/auth")


function checkAutheticatedUser(req, res, next) {
    const tokenCookie = req.cookies?.token

    req.user = null;
    
    if (!tokenCookie) return next();

    const user = getUser(tokenCookie);

    if (!user) return res.redirect("/login");
    
    req.user = user;
    
    return next()
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        console.log(req.user)
        if (!req.user) return res.redirect('/login')

        if (!roles.includes(req.user.role)) return res.send("unauthorized");

        return next()
    }
} 


module.exports = {
    checkAutheticatedUser,
    restrictTo
}