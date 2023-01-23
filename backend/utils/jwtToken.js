const { COOKIE_EXPIRE } = require('../config');

// Create jwtToken and saving in cookie
exports.createJwtAndSaveInCookie = (user, statusCode, res) => {
    const jwtToken = user.getJwtToken();

    //options for cookie
    const options = {
        expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.status(statusCode).cookie("jwtToken", jwtToken, options).json({
        success: true,
        user,
        jwtToken,
    })
};