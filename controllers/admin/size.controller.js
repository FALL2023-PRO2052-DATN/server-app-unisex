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
    res.status(200).render('size', { sizes: sizesReversed });
  } catch (error) {
    console.log('Render page size failed', error);
  }
}

const insertSize = async (req, res) => {
  try {
    const { sizeName, sizeDescription } = req.body;
    const sizes = await sizeModel.getSizes();

    if (isSizeNameExist(sizes, sizeName)) {
      req.flash('warning', 'Thêm không thành công. Tên kích thước đã tồn tại.');
    } else {
      const data = { sizeName, sizeDescription };
      await sizeModel.insertSize(data);
      req.flash('success', 'Thêm kích thước thành công');
    }

    res.status(200).redirect('/admin/size');
  } catch (error) {
    console.log('Inserter size falied', error);
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
      const data = { sizeID, sizeName, sizeDescription };
      await sizeModel.updateSize(data);
      req.flash('success', 'Cập nhật kích thước thành công.');
    }

    res.status(200).redirect('/admin/size');
  } catch (error) {
    console.log('Removing size error', error);
  }
}

const removeSize = async (req, res) => {
  try {
    const sizeID = req.params.sizeID;
    const productsWithSize = await productSizeModel.getProductSizesBySizeId(sizeID);

    if (productsWithSize.length > 0) {
      req.flash('warning', 'Xoá kích thước không thành công. Đã có sản phẩm thuộc kích thước này.');
    } else {
      await sizeModel.removeSize(sizeID);
      req.flash('success', 'Xoá kích thước thành công.');
    }

    res.status(200).redirect('/admin/size');
  } catch (error) {
    console.log('Removing size failed', error);
  }
}

module.exports = {
  renderPageSize,
  insertSize,
  updateSize,
  removeSize
}