const connection = require("../database/database.js")

const readCommentByIdProduct = (req, res) => {
  const { id } = req.body
  const query = "SELECT  NguoiDung.ho_va_ten, NguoiDung.anh_dai_dien, " +
    "DanhGia.ngay_danh_gia , DanhGia.diem_danh_gia, DanhGia.noi_dung " +
    "FROM DanhGia " +
    "INNER JOIN NguoiDung ON DanhGia.nguoi_dung_id = NguoiDung.id " +
    "WHERE DanhGia.hienThi = 1 AND DanhGia.san_pham_id = ?"

  connection.con.query(query, [id], (err, results) => {
    if (err) {
      res.json({ status: "ERROR", err })
    } else {
      res.json({ status: "SUCCESS", commentList: results })
    }
  })
}

const insertComment = (req, res) => {
  const { pointComment, content, idUser, idProduct } = req.body
  const query = " INSERT INTO DanhGia(diem_danh_gia, noi_dung, nguoi_dung_id, san_pham_id) VALUES(?, ?, ?, ?) "

  connection.con.query(query, [pointComment, content, idUser, idProduct], (err, results) => {
    if (err) {
      res.json({ status: "ERROR", err })
    } else {
      res.json({ status: "SUCCESS" })
    }
  })
}

module.exports = {
  readCommentByIdProduct,
  insertComment
}
