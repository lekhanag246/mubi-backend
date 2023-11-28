class CustomError extends Error {
    constructor(errorMessage, errorCode) {
        super(errorMessage);
        this.errorStatusCode = errorCode;
        this.errorStatus = this.errorStatusCode >= 400 && this.errorStatusCode <= 499 ? "fail" : "error"
    }
}

module.exports = CustomError;