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
        console.log(error);
    }
}

const pageAddProduct = async (req, res) => {
    try {
        const sizes = await sizeModel.getAll();
        const categoris = await categoryModel.getAll();
        res.render('add-product', { sizes, categoris });
    } catch (error) {
        console.log(error);
    }
}

const pageUpdateProduct = async (req, res) => {
    const { id } = req.params;
    const productsSize = await productSizeModel.getAllByProductId(id);
    const products = await productModel.getAllById(id);
    const categories = await categoryModel.getAll();
    const sizes = await sizeModel.getAll();
    console.log(productsSize);
    res.render('update-product', { product: products[0], productsSize, categories, sizes });
}

const insertProduct = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return console.error(err);

        }

        if (!req.file) {
            return;
        }

        const imageBuffer = req.file.buffer;
        // Tải hình ảnh lên cloudinary
        cloudinary.uploadImageToCloudinary(imageBuffer, async (err, imageUrl) => {
            if (err) {
                return res.status(500).send('Tải hình banner không thành công' + err);
            }

            try {
                var {
                    ten_san_pham,
                    gia_ban,
                    giam_gia,
                    mo_ta_chi_tiet,
                    noi_bat, moi_nhat,
                    so_luong,
                    danh_muc_id,
                    sizes
                } = req.body;

                const data = {
                    ten_san_pham,
                    imageUrl,
                    gia_ban,
                    giam_gia,
                    noi_bat,
                    moi_nhat,
                    mo_ta_chi_tiet,
                    danh_muc_id
                }

                const resultInsertProduct = await productModel.insert(data);
                const id_san_pham = resultInsertProduct.insertId;
                sizes = sizes || [0];
                // Thêm từng size vào cho sản phẩm vừa thêm
                for (const size of sizes) {
                    const data = { size, id_san_pham, so_luong };
                    await productSizeModel.insert(data);
                }

                req.flash('success', 'Thêm sản phẩm thành công');
                res.redirect('/admin/product/add');
            } catch (error) {
                console.error(error);
                res.status(500).send('Server error: ' + error);
            }
        })

    });
}
const updateProduct = async (req, res) => {
    var newImage = null;
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error(err);
            return;
        }

        if (req.file) {
            const imageBuffer = req.file.buffer;
            newImage = await cloudinary.uploadImageToCloudinary1(imageBuffer);
        }

        try {
            const { idProduct, name, price, description, outstanding, selling, idCategory, discount, imgUrl } = req.body;
            const data = {
                name,
                price,
                discount,
                outstanding,
                selling,
                description,
                idCategory,
                imgUrl,
                idProduct
            }

            if (newImage) {
                data.imgUrl = newImage;
            }

            await productModel.update(data);
            res.redirect('/admin/product/update/' + idProduct);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error: ' + error);
        }
    });
}

const removeProduct = async (req, res) => {
    try {
        const { id_san_pham } = req.body;
        await productModel.remove(id_san_pham);
        await productSizeModel.removeByIdProduct(id_san_pham);
        req.flash('success', 'Xoá sản phẩm thành công');
        res.redirect('/admin/product');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error);
    }
}

const insertProductSize = async (req, res) => {
    try {
        const { id_san_pham, size, so_luong } = req.body;
        const data = { size, id_san_pham, so_luong };
        await productSizeModel.insert(data);
        res.redirect('/admin/product/update/' + id_san_pham);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const updateProductSize = async (req, res) => {
    try {
        const { id_ktsp ,id_san_pham, size, so_luong } = req.body;
        const data = {
            size,
            id_san_pham,
            so_luong,
            id_ktsp
        };
        await productSizeModel.update(data)
        res.redirect('/admin/product/update/' + id_san_pham);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

const removeProductSize = async (req, res) => {
    try {
        const { idProduct, idProductSize } = req.body;
        await productSizeModel.removeById(idProductSize);
        res.redirect('/admin/product/update/' + idProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error.message);
    }
}

module.exports = {
    pageProduct,
    pageAddProduct,
    pageUpdateProduct,
    insertProduct,
    updateProduct,
    removeProductSize,
    removeProduct,
    insertProductSize,
    updateProductSize
}