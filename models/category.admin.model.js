const database = require('../database/database.js');

const getCategories = async () => {
    const query = `SELECT
                    dm.id AS id_danh_muc,
                    dm.ten_danh_muc AS ten_danh_muc,
                    COUNT(sp.id) AS so_luong_san_pham
                FROM
                    DanhMuc AS dm  
                LEFT JOIN
                    SanPham AS sp ON dm.id = sp.danh_muc_id AND sp.hienThi = 1
                WHERE
                    dm.hienThi = 1
                GROUP BY
                    dm.id`;
    return await database.queryDatabase(query, []);
}

const insertCategory = async (name) => {
    const query = `INSERT INTO DanhMuc (ten_danh_muc) VALUES (?)`;
    return await database.queryDatabase(query, [name]);
}

const updateCategory = async (data) => {
    const values = [data.name, data.id];
    const query = `UPDATE DanhMuc SET ten_danh_muc = ? WHERE id = ?`;
    return await database.queryDatabase(query, values);
}

const removeCategory = async (id) => {
    const query = `UPDATE DanhMuc SET hienThi = 0 WHERE id = ?`;
    return await database.queryDatabase(query, [id]);
}

module.exports = {
    getCategories,
    insertCategory,
    updateCategory,
    removeCategory
}