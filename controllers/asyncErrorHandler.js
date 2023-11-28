const asyncErrorHandler = function (handler) {
    return (req, res, next) => {
        handler(req, res, next).catch((error) => {
            // next(error)
            res.status(400).json({
                // message: error.message,
                error: error
            })
        })

    }
}

module.exports.asyncErrorHandler = asyncErrorHandler