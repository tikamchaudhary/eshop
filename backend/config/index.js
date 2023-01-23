require('dotenv').config({ path: 'config/.env' });

module.exports = {
    APP_PORT,
    DB_NAME,
    DB_URI,

    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,

    COOKIE_EXPIRE,

    JWT_SECRET_KEY,
    JWT_EXPIRE,

    SMTP_SERVICE,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_MAIL,
    SMTP_PASSWORD

} = process.env;