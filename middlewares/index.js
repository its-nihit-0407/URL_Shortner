const fs = require("fs")

function handleReqResLogs(filename) {

    return (req, res, next) => {
        const time = new Date()
        fs.appendFile(filename, `${time.toLocaleTimeString()} : ${req.ip} - ${req.path} : ${req.method}`, (err, data) => {
            next()
        })
    }

}


module.exports = {
    handleReqResLogs,
}