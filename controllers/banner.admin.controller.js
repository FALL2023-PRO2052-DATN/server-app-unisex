const multer = require('multer');
const cloudinary = require('../cloud/cloudinary.js');
const arrayHelpers = require('../helpers/array-helpers.js');
const bannerAdminModel = require('../models/banner.admin.model.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const renderPageBanner = async (req, res) => {
    try {
        const banners = await bannerAdminModel.getBanners();
        const bannersReversed = arrayHelpers.reverseArray(banners);

        res.status(200).render('banner', { banners: bannersReversed });
    } catch (error) {
        console.error('Render page banner error', error);
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
                // Tải ảnh lên Cloudinary
                const imageUrl = await cloudinary.uploadImageToCloudinary(imageBuffer);

                if (imageUrl) {
                    await bannerAdminModel.insertBanner(imageUrl);
                    req.flash('success', 'Thêm banner thành công.');
                } else {
                    req.flash('error', 'Thêm banner không thành công.');
                }

                res.status(200).redirect('/admin/banner');
            } catch (error) {
                console.error('Insert banner error', error);
            }
        }
    });
}

const removeBanner = async (req, res) => {
    try {
        const { id } = req.body;
        await bannerAdminModel.removeBanner(id);

        req.flash('success', 'Xoá banner thành công.');
        res.status(200).redirect('/admin/banner');
    } catch (error) {
        console.error('Remove banner error', error);
    }
}

module.exports = {
    renderPageBanner,
    insertBanner,
    removeBanner
}