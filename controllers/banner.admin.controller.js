const multer = require('multer');
const cloudinary = require('../cloud/cloudinary.js');
const bannerAdminModel = require('../models/banner.admin.model.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleError = (res, error) => {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
}

// Trang quản trị banner
const pageAdminBanner = async (req, res) => {
    try {
        const banners = await bannerAdminModel.getAll();
        res.status(200).render('banner', { banners });
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
                // Tải ảnh lên Clodinary
                const imageBuffer = req.file.buffer;
                const imageUrl = await cloudinary.uploadImageToCloudinary(imageBuffer);
                
                if (imageUrl) {
                    await bannerAdminModel.insert(imageUrl);
                    req.flash('success', 'Thêm banner thành công.');
                    res.status(200).redirect('/admin/banner');
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
        await bannerAdminModel.remove(id);
        req.flash('success', 'Xoá banner thành công.');
        res.status(200).redirect('/admin/banner');
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    pageAdminBanner,
    insertBanner,
    removeBanner
}