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
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        if (!req.file) {
            return;
        }

        const imageBuffer = req.file.buffer;
        // Tải ảnh lên Cloudinary
        cloudinary.uploadImageToCloudinary(imageBuffer, async (err, imageUrl) => {
            if (err) {
                return res.status(500).send('Tải hình lên cloudinary lỗi' + err);
            }

            try {
                await bannerModel.insert(imageUrl);
                req.flash('success', 'Thêm banner thành công.');
                res.redirect('/admin/banner');
            } catch (error) {
                console.error(error);
                return res.status(500).send('Server error: ' + error.message);
            }
        })
    });
}

const removeBanner = async (req, res) => {
    try {
        const { id_banner } = req.body;
        const results = await bannerModel.remove(id_banner);

        if (results.affectedRows === 0) {
            req.flash('error', 'Xoá banner không thành công.');
        }else{
            req.flash('success', 'Xoá banner thành công.');
        }

        res.redirect('/admin/banner');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error: ' + error.message);
    }
}

module.exports = {
    pageBanner,
    insertBanner,
    removeBanner
}