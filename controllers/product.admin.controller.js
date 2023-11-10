const multer = require('multer');
const cloudinary = require('../cloud/cloudinary.js');
const productAdminModel = require('../models/product.admin.model.js');
const sizeAdminModel = require('../models/size.admin.model.js');
const categoryAdminModel = require('../models/category.admin.model.js');
const productSizeAdminModel = require('../models/product-size.admin.model.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const pageAdminProduct = async (req, res) => {
    try {
        const products = await productAdminModel.getAll();
        res.status(200).render('product', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const pageAdminAddProduct = async (req, res) => {
    try {
        const sizes = await sizeAdminModel.getAllSizes();
        const categories = await categoryAdminModel.getCategories();
        res.status(200).render('add-product', { sizes, categories });
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
                    const resultInsertProduct = await productAdminModel.insert(data);
                    const idProduct = resultInsertProduct.insertId;

                    // Thêm kích thước sản phẩm
                    for (const size of sizes || [0]) {
                        const data = { size, idProduct, quantity };
                        await productSizeAdminModel.insert(data);
                    }

                    req.flash('success', 'Thêm sản phẩm thành công');
                    res.status(200).redirect('/admin/product/create');
                }
            } catch (error) {
                console.error(error);
                res.status(500).send('Server error: ' + error.message);
            }
        }
    });
}

const pageAdminUpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productsSize = await productSizeAdminModel.getAllByProductId(id);
        const products = await productAdminModel.getAllById(id);
        const categories = await categoryAdminModel.getAllCategories();
        const sizes = await sizeAdminModel.getAllSizes();
        res.status(200).render('update-product', { product: products[0], productsSize, categories, sizes });
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

            await productAdminModel.update(data);
            req.flash('success', 'Cập nhật thông tin chung thành công.');
            res.status(200).redirect('/admin/product/update/' + idProduct);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error: ' + error);
        }
    });
}

const removeProduct = async (req, res) => {
    try {
        const { idProduct } = req.body;
        await productAdminModel.remove(idProduct);
        await productSizeAdminModel.removeByProductId(idProduct);
        req.flash('success', 'Xoá sản phẩm thành công.');
        res.status(200).redirect('/admin/product');
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    pageAdminProduct,
    pageAdminAddProduct,
    pageAdminUpdateProduct,
    insertProduct,
    updateProduct,
    removeProduct
}