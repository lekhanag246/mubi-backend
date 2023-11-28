const mongoose = require("mongoose")

function validateId(id) {
    return mongoose.isValidObjectId(id);
}

module.exports = {
    validateId
}