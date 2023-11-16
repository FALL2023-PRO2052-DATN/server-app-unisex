const categoryModel = require('../../models/admin/category.model.js');
const productModel = require('../../models/admin/product.model.js');
const arrayHelpers = require('../../helpers/array-helpers.js');
const validateHelpers = require('../../helpers/validate-helpers.js');

const isCategoryNameExist = (categories, categoryName) => {
  return categories.some((category) => category.ten_danh_muc === categoryName);
}

const renderPageCategory = async (req, res) => {
  try {
    const categories = await categoryModel.getCategories();
    const categoriesReversed = arrayHelpers.reverseArray(categories);
    res.status(200).render('category', { categories: categoriesReversed });
  } catch (error) {
    console.error('Render page category error', error);
  }
}

const insertCategory = async (req, res) => {
  try {
    const categoryName = req.body.categoryName.trim();
    const categories = await categoryModel.getCategories();

    if (isCategoryNameExist(categories, categoryName)) {
      req.flash('warning', 'Thêm không thành công. Tên danh mục đã tồn tại.');
    } else {
      await categoryModel.insertCategory(categoryName);
      req.flash('success', 'Thêm danh mục thành công.');
    }

    res.status(200).redirect('/admin/category');
  } catch (error) {
    console.error('Inserter category failed', error);
  }
}

const updateCategory = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    const categoryName = req.body.categoryName;
    const categories = await categoryModel.getCategories();

    const categoryCurrentToUpdate = categories.find((category) => {
      return category.id_danh_muc === parseInt(categoryID, 10);
    });

    const categoriesExceptCurrent = categories.filter((category) => {
      return category !== categoryCurrentToUpdate;
    });

    if (isCategoryNameExist(categoriesExceptCurrent, categoryName)) {
      req.flash('warning', 'Cập nhật không thành công. Tên danh mục đã tồn tại.');
    } else {
      const data = { categoryID, categoryName };
      await categoryModel.updateCategory(data);
      req.flash('success', 'Cập nhật danh mục thành công.');
    }

    res.status(200).redirect('/admin/category');
  } catch (error) {
    console.error('Update category failed', error);
  }
}

const removeCategory = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    const products = await productModel.getProductsByCategoryId(categoryID);

    if (products.length > 0) {
      req.flash('warning', 'Không thể xóa danh mục. Đã có sản phẩm thuộc danh mục này.');
    } else {
      await categoryModel.removeCategory(categoryID);
      req.flash('success', 'Xóa danh mục thành công.');
    }

    res.status(200).redirect('/admin/category');
  } catch (error) {
    console.error('Removing category failed', error);
  }
}

module.exports = {
  renderPageCategory,
  insertCategory,
  updateCategory,
  removeCategory
}