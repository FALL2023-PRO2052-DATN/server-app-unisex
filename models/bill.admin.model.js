const database = require('../database/database.js');

const getAll = async () => {
    const query = `SELECT * FROM DonHang WHERE hienThi = 1`;
    return await database.queryDatabase(query, []);
}

module.exports = {
    getAll,
}