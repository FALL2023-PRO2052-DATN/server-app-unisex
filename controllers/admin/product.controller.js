const multer = require('multer');
const arrayHelpers = require('../../helpers/array-helpers.js');
const cloudinary = require('../../cloud/cloudinary.js');
const productModel = require('../../models/admin/product.model.js');
const sizeModel = require('../../models/admin/size.model.js');
const categoryModel = require('../../models/admin/category.model.js');
const productSizeModel = require('../../models/admin/product-size.model.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const renderPageProduct = async (req, res) => {
  try {
    const products = await productModel.getProducts();
    const productsReversed = arrayHelpers.reverseArray(products);
    res.status(200).render('product', { products: productsReversed });
  } catch (error) {
    console.error('Render page product failed', error);
  }
}

const renderPageInsertProduct = async (req, res) => {
  try {
    const sizes = await sizeModel.getSizes();
    const categories = await categoryModel.getCategories();
    res.status(200).render('add-product', { sizes, categories });
  } catch (error) {
    console.error('Render page insert product failed', error);
  }
}

const insertProduct = (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return console.error(err);
    }

    if (req.file) {
      try {
        var { name, price, discount, outstanding, selling, description, idCategory, quantity, sizes } = req.body;

        // Tải ảnh lên cloudinary
        const imageBuffer = req.file.buffer;
        const imageUrl = await cloudinary.uploadImageToCloudinary(imageBuffer);

        if (imageUrl) {
          const data = { name, imageUrl, price, discount, outstanding, selling, description, idCategory };

          const resultInsertProduct = await productModel.insertProduct(data);
          const idProduct = resultInsertProduct.insertId;

          // Kiểm tra size người dùng chọn mảng hay là đối tượng
          if (!Array.isArray(sizes)) {
            sizes = [sizes];
          }

          // Thực hiện thêm kích thước sản phẩm
          for (const size of sizes) {
            const data = { size, idProduct, quantity };
            await productSizeModel.insertProductSize(data);
          }

          req.flash('success', 'Thêm sản phẩm thành công');
          res.status(200).redirect('/admin/product/page-insert');
        }
      } catch (error) {
        console.error('Inserter product failed', error);
      }
    }
  });
}

const renderPageUpdateProduct = async (req, res) => {
  try {
    const productID = req.params.productID;
    const productsSize = await productSizeModel.getProductSizesByProductID(productID);
    const products = await productModel.getProductByID(productID);
    const categories = await categoryModel.getCategories();
    const sizes = await sizeModel.getSizes();
    res.status(200).render('update-product', { product: products[0], productsSize, categories, sizes });
  } catch (error) {
    console.error('Render page update product failed', error);
  }
}

const updateProduct = async (req, res) => {
  var newImage = null;
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error(err);
      return;
    }

    if (req.file) {
      // Nếu chọn ảnh thì sẽ upload ảnh lên cloudinary và cập nhật lại ảnh
      const imageBuffer = req.file.buffer;
      newImage = await cloudinary.uploadImageToCloudinary(imageBuffer);
    }

    try {
      const productID = req.params.productID;
      const { name, price, description, outstanding, selling, idCategory, discount, imgUrl } = req.body;
      const data = { name, price, discount, outstanding, selling, description, idCategory, imgUrl, productID };

      if (newImage) {
        data.imgUrl = newImage;
      }

      await productModel.updateProduct(data);
      req.flash('success', 'Cập nhật thông tin chung thành công.');
      res.status(200).redirect('/admin/product/' + productID);
    } catch (error) {
      console.error('Inserter product failed', error);
    }
  });
}

const removeProduct = async (req, res) => {
  try {
    const productID = req.params.productID;
    await productModel.removeProduct(productID);
    await productSizeModel.removeByProductID(productID);
    req.flash('success', 'Xoá sản phẩm thành công.');
    res.status(200).redirect('/admin/product');
  } catch (error) {
    console.error('Removing product failed', error);
  }
}

module.exports = {
  renderPageProduct,
  renderPageInsertProduct,
  renderPageUpdateProduct,
  insertProduct,
  updateProduct,
  removeProduct
}