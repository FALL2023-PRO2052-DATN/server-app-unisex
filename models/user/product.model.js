const connection = require("../../database/database.js")

// lấy danh sách sản phẩm mới 
const readProductNew = async () => {

  const query = "SELECT SanPham.id , SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.gia_ban, SanPham.giam_gia, SanPham.mo_ta_chi_tiet, DanhMuc.ten_danh_muc " +
    "FROM SanPham " +
    "INNER JOIN DanhMuc ON SanPham.danh_muc_id = DanhMuc.id " +
    "WHERE SanPham.moi_nhat = 1 AND SanPham.hienThi = 1"

  return await connection.queryDatabase(query, [])

}

// lấy danh sách sản phẩm mới 
const readProductOutsanding = async () => {

  const query = "SELECT SanPham.id , SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.gia_ban, SanPham.giam_gia, SanPham.mo_ta_chi_tiet, DanhMuc.ten_danh_muc " +
    "FROM SanPham " +
    "INNER JOIN DanhMuc ON SanPham.danh_muc_id = DanhMuc.id " +
    "WHERE SanPham.noi_bat = 1 AND SanPham.hienThi = 1"

  return await connection.queryDatabase(query, [])

}

// lấy tất cả sản phẩm
const readProductAll = async () => {

  const query = "SELECT SanPham.id , SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.gia_ban, SanPham.giam_gia, SanPham.mo_ta_chi_tiet, DanhMuc.ten_danh_muc " +
    "FROM SanPham " +
    "INNER JOIN DanhMuc ON SanPham.danh_muc_id = DanhMuc.id " +
    "WHERE SanPham.hienThi = 1"

  return await connection.queryDatabase(query, [])

}

// lấy danh sách sản phẩm theo loại sản phẩm
const readProductByIdDanhMuc = async (id) => {

  const query = "SELECT SanPham.id , SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.gia_ban, SanPham.giam_gia, SanPham.mo_ta_chi_tiet, DanhMuc.ten_danh_muc " +
    "FROM SanPham " +
    "INNER JOIN DanhMuc ON SanPham.danh_muc_id = DanhMuc.id " +
    "WHERE SanPham.hienThi = 1 AND SanPham.danh_muc_id = ?"

  return await connection.queryDatabase(query, [id])

}

// lấy sản phẩm theo id sản phẩm
const readProductByIdProduct = async (id) => {

  const query = "SELECT SanPham.id , SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.gia_ban, " +
    "SanPham.giam_gia, SanPham.mo_ta_chi_tiet, DanhMuc.ten_danh_muc, SanPham.danh_muc_id " +
    "FROM SanPham " +
    "INNER JOIN DanhMuc ON SanPham.danh_muc_id = DanhMuc.id " +
    "WHERE SanPham.hienThi = 1 AND SanPham.id = ?"

  return await connection.queryDatabase(query, [id])

}

// lấy size sản phẩm theo id sản phẩm
const readSize_ProductByIdProduct = async (id) => {

  const query = "SELECT KichThuoc_SanPham.kich_thuoc_id,  KichThuoc.ten_kich_thuoc, KichThuoc_SanPham.so_luong_ton_kho " +
    "FROM KichThuoc_SanPham " +
    "INNER JOIN KichThuoc ON KichThuoc_SanPham.kich_thuoc_id = KichThuoc.id " +
    "WHERE KichThuoc_SanPham.hienThi = 1 AND KichThuoc_SanPham.san_pham_id = ?"

  return await connection.queryDatabase(query, [id])

}

// lấy danh sách sản phẩm theo danh sách id sản phẩm
const readProductByListId = async (idUser, idList) => {

  const query = "SELECT GioHang.id, SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.giam_gia, " +
    "GioHang.so_luong, GioHang.don_gia, GioHang.kich_thuoc, GioHang.san_pham_id " +
    "FROM GioHang " +
    "INNER JOIN SanPham ON GioHang.san_pham_id = SanPham.id " +
    "WHERE GioHang.hienThi = 1 AND GioHang.nguoi_dung_id = ? AND GioHang.id IN (?)"

  return await connection.queryDatabase(query, [idUser, idList])

}



module.exports = {
  readProductNew,
  readProductOutsanding,
  readProductAll,
  readProductByIdDanhMuc,
  readProductByIdProduct,
  readSize_ProductByIdProduct,
  readProductByListId
}
