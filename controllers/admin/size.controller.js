const arrayHelpers = require('../../helpers/array-helpers.js');
const sizeModel = require('../../models/admin/size.model.js');
const productSizeModel = require('../../models/admin/product-size.model.js');

const isSizeNameExist = (sizes, sizeName) => {
  return sizes.some((size) => size.ten_kich_thuoc === sizeName);
}

const renderPageSize = async (req, res) => {
  try {
    const sizes = await sizeModel.getSizes();
    const sizesReversed = arrayHelpers.reverseArray(sizes);
    res.render('size', { sizes: sizesReversed });
  } catch (error) {
    console.error('Render page size failed', error);
  }
}

const insertSize = async (req, res) => {
  try {
    const { sizeName, sizeDescription } = req.body;
    const sizes = await sizeModel.getSizes();

    if (isSizeNameExist(sizes, sizeName)) {
      req.flash('warning', 'Thêm không thành công. Tên kích thước đã tồn tại.');
    } else {
      await sizeModel.insertSize({
        sizeName,
        sizeDescription
      });
      req.flash('success', 'Thêm kích thước thành công');
    }

    res.redirect('back');
  } catch (error) {
    console.error('Insert size falied', error);
  }
}

const updateSize = async (req, res) => {
  try {
    const sizeID = req.params.sizeID;
    const { sizeName, sizeDescription } = req.body;
    const sizes = await sizeModel.getSizes();

    const sizeCurrentToUpdate = sizes.find((size) => {
      return size.id === parseInt(sizeID, 10)
    });

    const sizesExceptCurrent = sizes.filter((size) => {
      return size !== sizeCurrentToUpdate
    });

    if (isSizeNameExist(sizesExceptCurrent, sizeName)) {
      req.flash('warning', 'Cập nhật không thành công. Tên kích thước đã tồn tại.');
    } else {
      const results = await sizeModel.updateSize({
        sizeID,
        sizeName,
        sizeDescription
      });

      if (results.changedRows > 0) {
        req.flash('success', 'Cập nhật kích thước thành công.');
      } else {
        req.flash('warning', 'Không có thay đổi nào được thực hiện.');
      }
    }

    res.redirect('back');
  } catch (error) {
    console.error('Update size falied', error);
  }
}

const removeSize = async (req, res) => {
  try {
    const sizeID = req.params.sizeID;
    const productsWithSize = await productSizeModel.getProductSizesBySizeId(sizeID);

    if (productsWithSize.length > 0) {
      req.flash('warning', 'Xoá kích thước không thành công. Đã có sản phẩm thuộc kích thước này.');
    } else {
      const results = await sizeModel.removeSize(sizeID);

      if (results.changedRows > 0) {
        req.flash('success', 'Xoá kích thước thành công.');
      } else {
        req.flash('error', 'Xoá kích thước không thành công.');
      }
    }

    res.redirect('back');
  } catch (error) {
    console.error('Removing size failed', error);
  }
}

module.exports = {
  renderPageSize,
  insertSize,
  updateSize,
  removeSize
}