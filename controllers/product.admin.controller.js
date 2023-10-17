const multer = require('multer');
const productModel = require('../models/product.admin.model.js');
const sizeModel = require('../models/size.admin.model.js');
const categoryModel = require('../models/category.admin.model.js');
const productSizeModel = require('../models/product-size.admin.model.js');
const cloudinary = require('../cloud/cloudinary.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const pageProduct = async (req, res) => {
    try {
        const products = await productModel.getAll();
        res.render('product', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const pageAddProduct = async (req, res) => {
    try {
        const sizes = await sizeModel.getAll();
        const categories = await categoryModel.getAll();
        res.render('add-product', { sizes, categories });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
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

                    // Thêm sẩn phẩm
                    const resultInsertProduct = await productModel.insert(data);
                    const idProduct = resultInsertProduct.insertId;

                    // Thêm kích thước sản phẩm
                    for (const size of sizes || [0]) {
                        const data = { size, idProduct, quantity };
                        await productSizeModel.insert(data);
                    }

                    req.flash('success', 'Thêm sản phẩm thành công');
                    res.redirect('/admin/product/create');
                }
            } catch (error) {
                console.error(error);
                res.status(500).send('Server error: ' + error.message);
            }
        }
    });
}

const pageUpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productsSize = await productSizeModel.getAllByProductId(id);
        const products = await productModel.getAllById(id);
        const categories = await categoryModel.getAll();
        const sizes = await sizeModel.getAll();
        res.render('update-product', { product: products[0], productsSize, categories, sizes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
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
            const { idProduct, name, price, description, outstanding, selling, idCategory, discount, imgUrl } = req.body;
            const data = { name, price, discount, outstanding, selling, description, idCategory, imgUrl, idProduct };

            if (newImage) {
                data.imgUrl = newImage;
            }

            await productModel.update(data);
            req.flash('success', 'Cập nhật thông tin chung thành công.');
            res.redirect('/admin/product/update/' + idProduct);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error: ' + error);
        }
    });
}

const removeProduct = async (req, res) => {
    try {
        const { idProduct } = req.body;
        await productModel.remove(idProduct);
        await productSizeModel.removeByIdProduct(idProduct);
        req.flash('success', 'Xoá sản phẩm thành công.');
        res.redirect('/admin/product');
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    pageProduct,
    pageAddProduct,
    pageUpdateProduct,
    insertProduct,
    updateProduct,
    removeProduct
}