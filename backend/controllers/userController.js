const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');
const User = require("../models/userModel");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require('../utils/errorHandlerClass');
const { createJwtAndSaveInCookie } = require("../utils/jwtToken");
const { sendEmail } = require("../utils/sendEmail");
const { uploadToCloudinary } = require('../uploads/cloudinary');




// Register user
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, tempFilePath } = req.files.avatar;
    const result = await uploadToCloudinary(name, tempFilePath, "avatar")

    req.body.avatar = result;
    const user = await User.create(req.body);

    // Create jwtToken and saving in cookie
    createJwtAndSaveInCookie(user, 201, res);
});


// Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    //checking that, user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Create jwtToken and saving in cookie
    createJwtAndSaveInCookie(user, 200, res);

});


// Logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    // options for cookie
    const options = { expires: new Date(Date.now()), httpOnly: true }

    res.status(200).cookie("jwtToken", null, options).json({
        success: true,
        message: "Logged Out "
    })
});


// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not registered", 401));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Email link
    // const resetPasswordUrl=`http://localhost/api/password/reset/${resetToken}`
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`;

    const message = `it's your reset password token, click on it. :- \n\n${resetPasswordUrl} \n\nIf you do not request then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Eshop password recovery`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully...`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});


// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler("Reset Password Token is invalid or has been expired", 400)
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    // Create jwtToken and saving in cookie
    createJwtAndSaveInCookie(user, 200, res);
});


// Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

// Update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("oldPassword is incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    // Create jwtToken and saving in cookie
    createJwtAndSaveInCookie(user, 200, res);
});

// Update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };
    // we will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
    });
});

// Get all users -- admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const usersCount = await User.countDocuments();

    const users = await User.find();
    res.status(200).json({
        success: true,
        usersCount,
        users,
    });
});

// Get single user -- admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }
    res.status(200).json({
        success: true,
        user,
    });
});

// Update user role -- admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };



    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true
    });
});

// Delete user -- admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    // We will remove cloudinary later

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted successfully ...",
    });
});
