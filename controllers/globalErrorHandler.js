const process = require('process')
const devErrorHandler = (res, error) => {
    //full details about error line number file name - stack trace
    //programming error
    return res.status(error.errCode || 500).json({
        "status": error.errStatus || 'fail',
        'message': error.message,
        "stackTrace": error.stack,
        "error": error
    })

}

// const prodErrorHandler = (res, error) => {
//     if (error.isOperational === true) {
//         //user entered something wrong
//         return res.status(error.errCode).json({
//             "status": error.errStatus,
//             'message': error.message

//         })

//     } else {
//         //server error - send a general message like 
//         // Something went wrong please try again later
//         return res.status(500).json({
//             "status": "error",
//             'message': "Something went wrong. Please try try again later."

//         })
//     }
// }

const globalErrorHandler = (error, req, res) => {
    // process.env.NODE_ENV == "DEVELOPMENT" && devErrorHandler(res, error)
    // process.env.NODE_ENV == "PRODUCTION" && prodErrorHandler(res, error);
    // if (process.env.NODE_ENV == 'DEVELOPMENT') {
    //     devErrorHandler(res, error)
    // }
    res.status(error.errCode || 500).json({
        "status": error.errStatus || 'fail',
        'message': error.message,
        "stackTrace": error.stack,
        "error": error
    })
}

module.exports.globalErrorHandler = globalErrorHandler;