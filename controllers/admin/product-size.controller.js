const productSizeMode = require('../../models/admin/product-size.model.js');

const renderPageProductSize = async (req, res) => {
  try {
    const productSizes = await productSizeMode.getProductSizes();  
    res.status(200).render('product-size', { productSizes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
  }
}

const insertProductSize = async (req, res) => {
  const { idProduct, size, quantity } = req.body;
  try {
    const data = { size, idProduct, quantity };
    await productSizeMode.insertProductSize(data);
    req.flash('success', 'Thêm phiên bản thành công.');
    res.status(200).redirect('/admin/product/' + idProduct);
  } catch (error) {
    console.error(error);
    req.flash('warning', 'Thêm phiên bản sản phẩm không thành công. Phiên bản đã tồn tại.');
    res.status(200).redirect('/admin/product/' + idProduct);
  }
}

const updateQuantityProductSize = async (req, res) => {
  try {
    const productSizeID = req.params.productSizeID;
    const { quantity } = req.body;
    await productSizeMode.updateQuatity(productSizeID, quantity);
    req.flash('success', 'Cập nhật nhập số lượng sản phẩm thành công');
    res.status(200).redirect('/admin/product-size');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
  }
}

const updateProductSize = async (req, res) => {
  const productSizeID = req.params.productSizeID;
  const { idProduct, size, quantity } = req.body;
  try {
    const data = {
      size,
      idProduct,
      quantity,
      productSizeID
    };
    await productSizeMode.updateProductSize(data);
    req.flash('success', 'Cập nhật phiên bản sản phẩm thành công.');
  } catch (error) {
    console.error(error);
    req.flash('warning', 'Phiên bản đã tồn tại trước đó. Cập nhật không thành công');
  } finally {
    res.status(200).redirect('/admin/product/' + idProduct);
  }
}

const removeProductSize = async (req, res) => {
  try {
    const { productSizeID } = req.params;
    await productSizeMode.removeProductSize(productSizeID);
    req.flash('success', 'Xoá kích thước sản phẩm thành công.');
    res.status(200).redirect('back');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: ' + error.message);
  }
}

module.exports = {
  renderPageProductSize,
  insertProductSize,
  updateProductSize,
  updateQuantityProductSize,
  removeProductSize,
}