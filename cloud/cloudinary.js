require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Tải ảnh lên Cloudinary
const uploadImageToCloudinary = (imageBuffer, callback) => {
    cloudinary.uploader.upload_stream({ folder: 'cloud-images/', resource_type: 'image' }, (error, result) => {
        if (error) {
            console.error(error);
            return callback(error, null);
        }
        const imageUrl = result.url;
        callback(null, imageUrl);
    }).end(imageBuffer);
};

const uploadImageToCloudinary1 = (imageBuffer) => {
    return new Promise((resolve, reject) => {
        uploadImageToCloudinary(imageBuffer, (err, imageUrl) => {
            if (err) {
                reject(err);
            } else {
                resolve(imageUrl);
            }
        });
    });
};

module.exports = {
    uploadImageToCloudinary,
    uploadImageToCloudinary1
};