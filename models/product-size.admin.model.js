const database = require('../database/database.js');

const getAll = async () => {

}

const insert = async (data) => {
    const values = [
        data.size,
        data.id_san_pham,
        data.so_luong
    ];
    const query = `INSERT INTO KichThuoc_SanPham (kich_thuoc_id, san_pham_id, so_luong_ton_kho) VALUES (?, ?, ?)`
    return await database.queryDatabase(query, values);
}

const update = async () => {

}

const removeByIdProduct = async (idProduct) => {
    const query = `UPDATE KichThuoc_SanPham SET hienThi = 0 WHERE san_pham_id=?`;
    return await database.queryDatabase(query, [idProduct]);
}

module.exports = {
    getAll,
    insert,
    update,
    removeByIdProduct
}