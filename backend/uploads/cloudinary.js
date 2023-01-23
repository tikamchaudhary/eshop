const cloudinary = require('cloudinary').v2
const fs = require('fs');

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('../config');

// Cloudinary configuration
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});


exports.uploadToCloudinary = async (name, tempFilePath, fileFor) => {

    return cloudinary.uploader
        .upload(tempFilePath, fileFor === "avatar" ?
            {
                public_id: `Eshop/avatars/${Date.now()}_${name}`,
                width: 150,
                // height: 150,
                crop: "scale",
            } :
            {
                // folder: "Eshop/products",
                // use_filename: true,
                public_id: `Eshop/products/${Date.now()}_${name}`,
            })
        .then((result) => {
            // Remove file from local uploads folder
            fs.unlinkSync(tempFilePath);
            return {
                // message: "success",
                public_id: result.public_id,
                url: result.secure_url
            };
        })
        .catch((error) => {
            // Remove file from local uploads folder
            fs.unlinkSync(tempFilePath);
            console.log(error);
            // return { message: "Fail" };
        });
}