const database = require('../database/database.js');

const getAll = async () => {
    const query = `SELECT * FROM KichThuoc WHERE hienThi = 1`;
    return await database.queryDatabase(query, []);
}

const insert = async (data) => {
    const values = [data.nameSize, data.description];
    const query = `INSERT INTO KichThuoc (ten_kich_thuoc, mo_ta_chi_tiet) VALUES (?, ?)`;
    return await database.queryDatabase(query, values);
}

const update = async (data) => {
    const values = [data.nameSize, data.description, data.idSize];
    const query = `UPDATE KichThuoc SET ten_kich_thuoc=?, mo_ta_chi_tiet=? WHERE id=?`;
    return await database.queryDatabase(query, values);
}

const remove = async (idSize) => {
    const query = `UPDATE KichThuoc SET hienThi = 0 WHERE id=?`;
    return await database.queryDatabase(query, [idSize]);
}

module.exports = {
    getAll,
    insert,
    update,
    remove,
}