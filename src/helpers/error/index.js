export default class ErrorHandler {
    constructor(statusCode, message, error) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}

export const handleError = (err, res) => {
    const {statusCode, message, error} = err;
    res.status(statusCode).send({
        status: "error",
        statusCode,
        message,
        error
    });
};

export const makeError = (error) => {
    throw new error;
};