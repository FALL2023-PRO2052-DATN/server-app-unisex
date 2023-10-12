const database = require('../database/database.js');

const getAll = async () => {
    const query = `SELECT
                    dm.id AS id_danh_muc,
                    dm.ten_danh_muc AS ten_danh_muc,
                    COUNT(sp.id) AS so_luong_san_pham
                FROM
                    shop_clothes.DanhMuc AS dm  
                LEFT JOIN
                    shop_clothes.SanPham AS sp ON dm.id = sp.danh_muc_id AND sp.hienThi = 1
                WHERE
                    dm.hienThi = 1
                GROUP BY
                    dm.id`;
    return await database.queryDatabase(query, []);
}

const insert = async (nameCategory) => {
    const query = `INSERT INTO DanhMuc (ten_danh_muc) VALUES (?)`;
    return await database.queryDatabase(query, [nameCategory]);
}

const update = async (data) => {
    const values = [data.nameCategory, data.idCategory];
    const query = `UPDATE DanhMuc SET ten_danh_muc =? WHERE id=?`;
    return await database.queryDatabase(query, values);
}

const remove = async (idCategory) => {
    const query = 'UPDATE DanhMuc SET hienThi = 0 WHERE id = ?';
    return await database.queryDatabase(query, idCategory);
}

const getProductsByIdCategory = async (idCategory) => {
    const query = 'SELECT * FROM SanPham WHERE danh_muc_id = ? AND hienThi = 1';
    return await database.queryDatabase(query, [idCategory]);
}

module.exports = {
    getAll,
    insert,
    update,
    remove,
    getProductsByIdCategory
}