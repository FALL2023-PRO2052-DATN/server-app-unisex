const multer = require('multer');
const cloudinary = require('../../cloud/cloudinary.js');
const arrayHelpers = require('../../helpers/array-helpers.js');
const bannerModel = require('../../models/admin/banner.model.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const renderPageBanner = async (req, res) => {
  try {
    const banners = await bannerModel.getBanners();
    const bannersReversed = arrayHelpers.reverseArray(banners);
    res.render('banner', {
      banners: bannersReversed
    });
  } catch (error) {
    console.error('Rendering banner failed', error);
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
        const imgUrl = await cloudinary.uploadImageToCloudinary(imageBuffer);

        if (imgUrl) {
          await bannerModel.insertBanner(imgUrl);
          req.flash('success', 'Thêm banner thành công.');
        } else {
          req.flash('error', 'Thêm banner không thành công.');
        }
        res.redirect('back');
      } catch (error) {
        console.error('Inserter banner failed', error);
      }
    }
  });
}

const removeBanner = async (req, res) => {
  const bannerID = req.params.bannerID;
  try {
    const results = await bannerModel.removeBanner(bannerID);

    if (results.changedRows > 0) {
      req.flash('success', 'Xoá banner thành công.');
    } else {
      req.flash('error', 'Xoá banner không thành công.');
    }
    res.redirect('back');
  } catch (error) {
    console.error('Removing banner failed', error);
  }
}

module.exports = {
  renderPageBanner,
  insertBanner,
  removeBanner
}