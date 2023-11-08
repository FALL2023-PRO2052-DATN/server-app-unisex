const database = require('../../database/database.js');

const signIn = async (username, password) => {
    const query = `SELECT * FROM NhanVien WHERE ten_dang_nhap = ? AND mat_khau =? AND hienThi = 1 AND vai_tro = 'ADMIN';`;
    return await database.queryDatabase(query, [username, password]);
}

module.exports = {
    signIn
}