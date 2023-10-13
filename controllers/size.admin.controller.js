const sizeModel = require('../models/size.admin.model.js');

const pageSize = async (req, res) => {
    try {
        const sizes = await sizeModel.getAll();
        res.render('size', { sizes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error);
    }
}

const insertSize = async (req, res) => {
    try {
        const { nameSize, description } = req.body;
        const sizes = await sizeModel.getAll();

        // Kiểm tra kích thước tồn tại hay chưa
        const isSizeExist = sizes.some((size) => size.ten_kich_thuoc === nameSize);

        if (isSizeExist) {
            req.flash('warning', 'Thêm kích thước không thành công. Tên kích thước đã tồn tại');
        } else {
            const data = { nameSize, description };
            await sizeModel.insert(data);
            req.flash('success', 'Thêm kích thước thành công');
        }

        res.redirect('/admin/size');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error);
    }
}


const updateSize = async (req, res) => {
    try {
        const { idSize, nameSize, description } = req.body;
        const sizes = await sizeModel.getAll();

        // Lấy danh sách kích thước ngoại trừ kích thước hiện tại
        const sizesExceptCurrent = sizes.filter((size) => size.id !== parseInt(idSize, 10));

        // Kiểm tra tên kích thước tồn tại trong danh sách kích thước sizesExceptCurrent
        const isSizeExist = sizesExceptCurrent.some((size) => size.ten_kich_thuoc === nameSize);

        if (isSizeExist) {
            req.flash('warning', 'Cập nhật kích thước không thành công. Tên kích thước đã tồn tại');
        } else {
            const data = { 
                idSize, 
                nameSize, 
                description 
            };
            await sizeModel.update(data);
            req.flash('success', 'Cập nhật kích thước thành công');
        }

        res.redirect('/admin/size');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error);
    }
}

const removeSize = async (req, res) => {
    try {
        const { idSize } = req.body;
        
        // Kiểm tra có sản phẩm nào thuộc kích thước hay không
        const productsWithSize = await sizeModel.getProductsBySize(idSize);

        if (productsWithSize.length === 0) {
            await sizeModel.remove(idSize);
            req.flash('success', 'Xoá kích thước thành công.');
        } else {
            req.flash('warning', 'Xoá kích thước không thành công. Đã có sản phẩm thuộc kích thước này');
        }

        res.redirect('/admin/size');

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error: ' + error);
    }
}

module.exports = {
    pageSize,
    insertSize,
    updateSize,
    removeSize
}