const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

async function handleConnectDB(url) {
    return await mongoose.connect(url);    
}

module.exports = {
    handleConnectDB
}