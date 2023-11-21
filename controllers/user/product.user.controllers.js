const connection = require("../../database/database.js")

const readProductNew = (req, res) => {
  const query = "SELECT SanPham.id , SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.gia_ban, SanPham.giam_gia, SanPham.mo_ta_chi_tiet, DanhMuc.ten_danh_muc " +
    "FROM SanPham " +
    "INNER JOIN DanhMuc ON SanPham.danh_muc_id = DanhMuc.id " +
    "WHERE SanPham.moi_nhat = 1 AND SanPham.hienThi = 1"

  connection.con.query(query, (err, results) => {
    if (err) {
      res.json({ status: "ERROR", err })
    } else {
      if (results.length > 0) {
        res.json({ status: "SUCCESS", sanPham: results })
      } else {
        res.json({ status: "NOT FOUND" })
      }
    }
  })
}

const readProductOutsanding = (req, res) => {
  const query = "SELECT SanPham.id , SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.gia_ban, SanPham.giam_gia, SanPham.mo_ta_chi_tiet, DanhMuc.ten_danh_muc " +
    "FROM SanPham " +
    "INNER JOIN DanhMuc ON SanPham.danh_muc_id = DanhMuc.id " +
    "WHERE SanPham.noi_bat = 1 AND SanPham.hienThi = 1"

  connection.con.query(query, (err, results) => {
    if (err) {
      res.json({ status: "ERROR", err })
    } else {
      if (results.length > 0) {
        res.json({ status: "SUCCESS", sanPham: results })
      } else {
        res.json({ status: "NOT FOUND" })
      }
    }
  })
}

const readProductAll = (req, res) => {
  const query = "SELECT SanPham.id , SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.gia_ban, SanPham.giam_gia, SanPham.mo_ta_chi_tiet, DanhMuc.ten_danh_muc " +
    "FROM SanPham " +
    "INNER JOIN DanhMuc ON SanPham.danh_muc_id = DanhMuc.id " +
    "WHERE SanPham.hienThi = 1"

  connection.con.query(query, (err, results) => {
    if (err) {
      res.json({ status: "ERROR", err })
    } else {
      if (results.length > 0) {
        res.json({ status: "SUCCESS", sanPham: results })
      } else {
        res.json({ status: "NOT FOUND" })
      }
    }
  })
}

const readProductByIdDanhMuc = (req, res) => {
  const { id } = req.body
  const query = "SELECT SanPham.id , SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.gia_ban, SanPham.giam_gia, SanPham.mo_ta_chi_tiet, DanhMuc.ten_danh_muc " +
    "FROM SanPham " +
    "INNER JOIN DanhMuc ON SanPham.danh_muc_id = DanhMuc.id " +
    "WHERE SanPham.hienThi = 1 AND SanPham.danh_muc_id = ?"

  connection.con.query(query, [id], (err, results) => {
    if (err) {
      res.json({ status: "ERROR", err })
    } else {
      res.json({ status: "SUCCESS", sanPham: results })
    }
  })
}

const readProductByIdProduct = (req, res) => {
  const { id } = req.body
  const query = "SELECT SanPham.id , SanPham.ten_san_pham, SanPham.anh_dai_dien, SanPham.gia_ban, " +
    "SanPham.giam_gia, SanPham.mo_ta_chi_tiet, DanhMuc.ten_danh_muc, SanPham.danh_muc_id " +
    "FROM SanPham " +
    "INNER JOIN DanhMuc ON SanPham.danh_muc_id = DanhMuc.id " +
    "WHERE SanPham.hienThi = 1 AND SanPham.id = ?"

  connection.con.query(query, [id], (err, results) => {
    if (err) {
      res.json({ status: "ERROR", err })
    } else {
      res.json({ status: "SUCCESS", sanPham: results })
    }
  })
}


const readSize_ProductByIdProduct = (req, res) => {
  const { id } = req.body
  const query = "SELECT KichThuoc_SanPham.kich_thuoc_id,  KichThuoc.ten_kich_thuoc, KichThuoc_SanPham.so_luong_ton_kho " +
    "FROM KichThuoc_SanPham " +
    "INNER JOIN KichThuoc ON KichThuoc_SanPham.kich_thuoc_id = KichThuoc.id " +
    "WHERE KichThuoc_SanPham.hienThi = 1 AND KichThuoc_SanPham.san_pham_id = ?"

  connection.con.query(query, [id], (err, results) => {
    if (err) {
      res.json({ status: "ERROR", err })
    } else {
      res.json({ status: "SUCCESS", sizeProduct: results })
    }
  })
}




module.exports = {
  readProductNew,
  readProductOutsanding,
  readProductAll,
  readProductByIdDanhMuc,
  readProductByIdProduct,
  readSize_ProductByIdProduct

}
