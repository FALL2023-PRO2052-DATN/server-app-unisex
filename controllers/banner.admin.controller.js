const multer = require('multer');
const bannerModel = require('../models/banner.admin.model.js')
const cloudinary = require('../cloud/cloudinary.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

const pageBanner = async (req, res) => {
    try {
        const banners = await bannerModel.getAll();
        return res.render('banner', { banners });
    } catch (error) {
        handleError(res, error);
    }
}

const insertBanner = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error(err);
            return;
        }

        if (req.file) {
            try {
                const imageBuffer = req.file.buffer;
                // Tải ảnh lên cloudinary
                const imageUrl = await cloudinary.uploadImageToCloudinary(imageBuffer); 

                if (imageUrl) {
                    await bannerModel.insert(imageUrl);
                    req.flash('success', 'Thêm banner thành công.');
                    res.redirect('/admin/banner');
                }
            } catch (error) {
                handleError(res, error);
            }
        }
    });
}

const removeBanner = async (req, res) => {
    try {
        const { id } = req.body;
        await bannerModel.remove(id);
        req.flash('success', 'Xoá banner thành công.');
        res.redirect('/admin/banner');
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    pageBanner,
    insertBanner,
    removeBanner
}