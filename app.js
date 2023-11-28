const express = require('express');
const app = express();
const cors = require('cors');

const { globalErrorHandler } = require('./controllers/globalErrorHandler');
const CustomError = require('./utils/CustomError');
const { movieRouter } = require('./routes/movieRouter')


app.use(cors()); //to respond to requests from other origins
app.use(express.json()); //to send json data
app.use(express.urlencoded({ extended: false })); //to accept form data 

app.use('/app/v1/movies', movieRouter); //our routes
//page not found - if non of the above routes match that * is matched
app.all('*', (req, res, next) => {
    let err = new CustomError(`${req.originalUrl} path does not exist`, 404);
    next(err);
})

//handling all errors 
app.use(globalErrorHandler);

module.exports = app;
