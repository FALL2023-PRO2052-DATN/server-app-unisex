const database = require('../database/database.js');

const getAll = async () => {
    const query = `SELECT * FROM NhanVien WHERE hienThi = 1 AND vai_tro = 'STAFF'`;
    return await database.queryDatabase(query, []);
}

const insert = async (data) => {
    const query = `INSERT INTO NhanVien (ten_dang_nhap, ho_va_ten, dien_thoai, mat_khau, anh_dai_dien, dia_chi, gioi_tinh, ngay_sinh, vai_tro, hienThi) VALUES (?,?,?,?,?,?,?,?,'STAFF', 1)`;
    const values = [
        data.username,
        data.fullName,
        data.phoneNumber,
        data.password,
        data.imgUrl,
        data.address,
        data.gender,
        data.dateOfBirth
    ];
    return await database.queryDatabase(query, values);
}

const update = async() => {

}

const remove = async(id) => {
    const query = `UPDATE NhanVien SET hienThi = 0 WHERE ten_dang_nhap =?`;
    return await database.queryDatabase(query, [id]);
}

module.exports = {
    getAll,
    insert,
    update,
    remove
}