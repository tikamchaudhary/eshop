const ErrorHandler = require('../utils/errorHandlerClass');

exports.errorHandlerMiddleware = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong product Id Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid:${err.path}`;
        err = new ErrorHandler(message, 400);
    }


    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`;
        err = new ErrorHandler(message, 400);
    }

    // wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `JsonWebToken is invalid, Try again`;
        err = new ErrorHandler(message, 400);
    }


    // wrong expire error
    if (err.name === "TokenExpiredError") {
        const message = `JsonWebToken is expired, Try again`;
        err = new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // error: err.stack
    })
};