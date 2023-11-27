const database = require('../../database/database.js');

const authenticateUser = async ({ username, password }) => {
  const query = `SELECT * FROM NhanVien WHERE ten_dang_nhap = ? AND mat_khau =? AND hienThi = 1 AND vai_tro = 'ADMIN'`;
  const values = [username, password];
  return await database.queryDatabase(query, values);
}

const updateProfileUser = async (data) => {
  const query = `UPDATE NhanVien SET ho_va_ten=?, dien_thoai=?, mat_khau=?, anh_dai_dien=?, dia_chi=?, gioi_tinh=?, ngay_sinh=? WHERE ten_dang_nhap=?`;
  const values = [
    data.fullName,
    data.phoneNumber,
    data.password,
    data.imgUrl,
    data.address,
    data.gender,
    data.dateOfBirth,
    data.username,
  ];
  return await database.queryDatabase(query, values);
}

const getCurrentUser = async (username) => {
  const query = `SELECT * FROM NhanVien WHERE ten_dang_nhap = ? AND hienThi = 1`;
  return await database.queryDatabase(query, username);
}

module.exports = {
  authenticateUser,
  updateProfileUser,
  getCurrentUser
}