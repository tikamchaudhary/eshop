const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { JWT_SECRET_KEY, JWT_EXPIRE } = require('../config');

// Defining schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please Enter Your Name"],
        maxLenght: [30, "Name cannot exceed 30 characters"],
        minLenght: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLenght: [8, "Password should be greater than 8 characters"],
        select: false
    },
    avatar: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },

    role: { type: String, default: "user" },

    createdAt: { type: String, default: new Date() },
    updatedAt: { type: String, default: new Date() },

    resetPasswordToken: String,
    resetPasswordExpire: Date

}, { timestamps: true });

//Hashing password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Create jwtToken
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE })
};


// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};


// Generating reset password token
userSchema.methods.getResetPasswordToken = function () {
    // Generating tooken
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userschema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;  // 10 minutes
    return resetToken;
};


// Creating model
module.exports = mongoose.model('User', userSchema, 'users');