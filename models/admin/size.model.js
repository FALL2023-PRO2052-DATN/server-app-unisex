const database = require('../../database/database.js');

const getSizes = async () => {
    const query = `SELECT * FROM KichThuoc WHERE hienThi = 1`;
    return await database.queryDatabase(query, []);
}

const insertSize = async (data) => {
    const values = [data.sizeName, data.sizeDescription];
    const query = `INSERT INTO KichThuoc (ten_kich_thuoc, mo_ta_chi_tiet) VALUES (?, ?)`;
    return await database.queryDatabase(query, values);
}

const updateSize = async (data) => {
    const values = [
        data.sizeName,
        data.sizeDescription,
        data.sizeID
    ];
    const query = `UPDATE KichThuoc SET ten_kich_thuoc=?, mo_ta_chi_tiet=? WHERE id=?`;
    return await database.queryDatabase(query, values);
}

const removeSize = async (sizeID) => {
    const query = `UPDATE KichThuoc SET hienThi = 0 WHERE id=?`;
    return await database.queryDatabase(query, [sizeID]);
}

module.exports = {
    getSizes,
    insertSize,
    updateSize,
    removeSize,
}