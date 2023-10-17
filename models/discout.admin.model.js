const database = require('../database/database.js');

const getAll = async () => {
    const query = `SELECT * FROM GiamGia WHERE hienThi = 1;`;
    return await database.queryDatabase(query, []);
}

const insert = async (data) => {
    const values = [
        data.code, 
        data.value
    ];
    const query = `INSERT INTO GiamGia(code, gia_tri) VALUES (?, ?)`;
    return await database.queryDatabase(query, values);
}

const update = async (data) => {
    const values = [
        data.code,
        data.value,
        data.id
    ];
    const query = `UPDATE GiamGia SET code=?, gia_tri=? WHERE id=?`;
    return await database.queryDatabase(query, values);
}

const remove = async (id) => {
    const query = `UPDATE GiamGia SET hienThi = 0 WHERE id=?`;
    return await database.queryDatabase(query, [id]);
}

module.exports = {
    getAll,
    insert,
    update,
    remove
}