const database = require('../../database/database.js');

const login = async (username, password) => {
    const query = `SELECT * FROM NhanVien WHERE ten_dang_nhap = ? AND mat_khau =? AND hienThi = 1;`;
    return await database.queryDatabase(query, [username, password]);
}

const updateProfile = async (data) => {
    const query = `UPDATE NhanVien SET ho_va_ten = ?, dien_thoai = ?, dia_chi=?, gioi_tinh=?, ngay_sinh=? WHERE ten_dang_nhap = ?`;
    const values = [data.fullname, data.phoneNumber, data.address, data.gender, data.dateOfBirth, data.username];
    return await database.queryDatabase(query, values);
}

const updatePassword = async (username, passwordNew) => {
    const query = `UPDATE NhanVien SET mat_khau = ? WHERE ten_dang_nhap = ?`;
    return await database.queryDatabase(query, [passwordNew, username]);
}

module.exports = {
    login,
    updateProfile,
    updatePassword
}