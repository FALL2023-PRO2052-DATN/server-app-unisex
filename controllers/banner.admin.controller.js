const multer = require('multer');
const bannerModel = require('../models/banner.admin.model.js')
const cloudinary = require('../cloud/cloudinary.js');

// Set up upload image
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const pageBanner = async (req, res) => {
    try {
        const banners = await bannerModel.getAll();
        return res.render('banner', { banners });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error: ' + error.message);
    }
}

const insertBanner = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error(err);
            return;
        }

        if (!req.file) {
            console.error('Null image');
            return;
        }

        const imageBuffer = req.file.buffer;

        try {
            const imageUrl = await cloudinary.uploadImageToCloudinary(imageBuffer);
            await bannerModel.insert(imageUrl);
            req.flash('success', 'Thêm banner thành công.');
            res.redirect('/admin/banner');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error: ' + error.message);
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
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

module.exports = {
    pageBanner,
    insertBanner,
    removeBanner
}