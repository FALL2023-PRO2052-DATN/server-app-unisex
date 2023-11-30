const connection = require("../../database/database.js")

//lấy danh sách đánh giá theo sản phẩm và hiển thị = 1
const readCommentByIdProduct = async (id) => {

  const query = "SELECT  NguoiDung.ho_va_ten, NguoiDung.anh_dai_dien, " +
    "DanhGia.ngay_danh_gia , DanhGia.diem_danh_gia, DanhGia.noi_dung " +
    "FROM DanhGia " +
    "INNER JOIN NguoiDung ON DanhGia.nguoi_dung_id = NguoiDung.id " +
    "WHERE DanhGia.hienThi = 1 AND DanhGia.san_pham_id = ?"

  return await connection.queryDatabase(query, id)

}

// thêm đánh giá 
const insertComment = async (pointComment, content, idUser, idProduct) => {

  const query = " INSERT INTO DanhGia(diem_danh_gia, noi_dung, nguoi_dung_id, san_pham_id) VALUES(?, ?, ?, ?) "

  return await connection.queryDatabase(query, [pointComment, content, idUser, idProduct])

}

//lấy danh sách đánh giá theo sản phẩm theo số sao đánh giá và hiển thị = 1
const readCommentByIdStar = async (id, star) => {

  const query = "SELECT  NguoiDung.ho_va_ten, NguoiDung.anh_dai_dien, " +
    "DanhGia.ngay_danh_gia , DanhGia.diem_danh_gia, DanhGia.noi_dung " +
    "FROM DanhGia " +
    "INNER JOIN NguoiDung ON DanhGia.nguoi_dung_id = NguoiDung.id " +
    "WHERE DanhGia.hienThi = 1 AND DanhGia.san_pham_id = ? AND DanhGia.diem_danh_gia >= ? AND DanhGia.diem_danh_gia < ? + 1"

  return await connection.queryDatabase(query, [id, star, star])

}

module.exports = {
  readCommentByIdProduct,
  insertComment,
  readCommentByIdStar
}
