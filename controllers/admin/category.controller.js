const categoryModel = require('../../models/admin/category.model.js');
const productModel = require('../../models/admin/product.model.js');
const arrayHelpers = require('../../helpers/array-helpers.js');

const isCategoryNameExist = (categories, categoryName) => {
  return categories.some((category) => category.ten_danh_muc === categoryName);
}

const renderPageCategory = async (req, res) => {
  try {
    // Lấy danh sách danh mục sản phẩm
    const categories = await categoryModel.getCategories();
    const categoriesReversed = arrayHelpers.reverseArray(categories);
    res.render('category', { categories: categoriesReversed });
  } catch (error) {
    console.error('Render page category error', error);
  }
}

const insertCategory = async (req, res) => {
  const categoryName = req.body.categoryName.trim();
  try {
    // Lấy danh sách danh mục sản phẩm
    const categories = await categoryModel.getCategories();

    // Kiểm tra tên danh mục
    if (isCategoryNameExist(categories, categoryName)) {
      req.flash('warning', 'Thêm không thành công. Tên danh mục đã tồn tại.');
    } else {
      // Thêm danh mục mới
      await categoryModel.insertCategory(categoryName);
      req.flash('success', 'Thêm danh mục thành công.');
    }

    res.redirect('back');
  } catch (error) {
    console.error('Insert category failed', error);
  }
}

const updateCategory = async (req, res) => {
  const categoryID = req.params.categoryID;
  const categoryName = req.body.categoryName.trim();
  try {
    // Lấy danh sách danh mục sản phẩm
    const categories = await categoryModel.getCategories();

    // Lấy danh mục hiện tại cần cập nhật
    const categoryCurrentToUpdate = categories.find((category) => {
      return category.id_danh_muc === parseInt(categoryID, 10);
    });

    // Lấy danh sách danh mục trừ danh mục hiện tại
    const categoriesExceptCurrent = categories.filter((category) => {
      return category !== categoryCurrentToUpdate;
    });

    // Kiểm tra tên danh mục có tồn tại
    if (isCategoryNameExist(categoriesExceptCurrent, categoryName)) {
      req.flash('warning', 'Cập nhật không thành công. Tên danh mục đã tồn tại.');
    } else {
      // Cập nhật danh mục
      const results = await categoryModel.updateCategory({
        categoryID,
        categoryName
      });

      if (results.changedRows > 0) {
        req.flash('success', 'Cập nhật danh mục thành công.');
      } else {
        req.flash('warning', 'Không có thay đổi nào được thực hiện.');
      }
    }

    res.redirect('back');
  } catch (error) {
    console.error('Update category failed', error);
  }
}

const removeCategory = async (req, res) => {
  const categoryID = req.params.categoryID;
  try {
    // Lấy danh sách sản phẩm thuộc danh mục
    const products = await productModel.getProductsByCategoryID(categoryID);

    if (products.length > 0) {
      req.flash('warning', 'Không thể xóa danh mục. Đã có sản phẩm thuộc danh mục này.');
    } else {
      // Xoá danh mục sản phẩm néu kh có sản phẩm tồn tại
      const results = await categoryModel.removeCategory(categoryID);

      if (results.changedRows > 0) {
        req.flash('success', 'Xóa danh mục thành công.');
      } else {
        req.flash('error', 'Xóa danh mục không thành công.');
      }
    }

    res.redirect('back');
  } catch (error) {
    console.error('Remove category failed', error);
  }
}

module.exports = {
  renderPageCategory,
  insertCategory,
  updateCategory,
  removeCategory
}