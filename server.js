const http = require('http');
const app = require('./app');
const process = require('process');
if (process.env.NODE_ENV == 'DEVELOPMENT') {
    require('dotenv').config();
}

let PORT = process.env.PORT;

const connectToDb = require('./db');
connectToDb();

http.createServer(app).listen(PORT, (error) => {
    if (error) {
        console.log("error !!! creating server")
    } else {
        console.log(`success !!!server listening to port ${PORT}`)
    }
})

