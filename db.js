const process = require('process');
const mongoose = require('mongoose');

let MONGODB_URI =
    process.env.NODE_ENV == 'DEVELOPMENT' ?
        process.env.MONGODB_LOCAL :
        process.env.MONGODB_CLOUD;
//TODO ADD THE url for cloud db
// console.log(MONGODB_URI)


async function connectToDb() {
    try {
        let data = await mongoose.connect(MONGODB_URI);
        console.log(`successfully!!!connected to DB`)
    } catch (error) {
        console.log(`error!!!connecting to DB - ${error.message}`)
    }
}
module.exports = connectToDb;