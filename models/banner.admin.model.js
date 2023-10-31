const database = require('../database/database.js');

// Lấy tất cả danh sách banner trong database
const getAll = async () => {
    const query = `SELECT * FROM Banner WHERE hienThi = 1`;
    return await database.queryDatabase(query, []);
}

// Thêm banner vào database
const insert = async (imageUrl) => {
    const query = `INSERT INTO Banner (anh_banner) VALUES (?)`;
    return await database.queryDatabase(query, [imageUrl]);
}

// Xoá banner => cập nhật lại hienThi = 0
const remove = async (id) => {
    const query = `UPDATE Banner SET hienThi = 0 WHERE id = ?`;
    return await database.queryDatabase(query, [id]);
}

module.exports = {
    getAll,
    insert,
    remove
}