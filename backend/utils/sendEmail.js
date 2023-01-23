const nodemailer = require("nodemailer");
const { SMTP_SERVICE, SMTP_HOST, SMTP_PORT, SMTP_MAIL, SMTP_PASSWORD } = require('../config');

exports.sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        service: SMTP_SERVICE,
        auth: { user: SMTP_MAIL, pass: SMTP_PASSWORD },
    })

    const mailOptions = {
        from: SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};