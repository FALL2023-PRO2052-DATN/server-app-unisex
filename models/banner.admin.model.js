const database = require('../database/database.js');

const getBanners = async () => {
    const query = `SELECT * FROM Banner WHERE hienThi = 1`;
    return await database.queryDatabase(query, []);
}

const insertBanner = async (imageUrl) => {
    const query = `INSERT INTO Banner (anh_banner) VALUES (?)`;
    return await database.queryDatabase(query, [imageUrl]);
}

const removeBanner = async (id) => {
    const query = `UPDATE Banner SET hienThi = 0 WHERE id = ?`;
    return await database.queryDatabase(query, [id]);
}

module.exports = {
    getBanners,
    insertBanner,
    removeBanner
}