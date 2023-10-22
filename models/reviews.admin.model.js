const database = require("../database/database.js");

const getAll = async () => {
  const query = `SELECT 
                  DG.id, 
                  DG.diem_danh_gia, 
                  DG.ngay_danh_gia, 
                  DG.noi_dung, 
                  ND.ho_va_ten, 
                  SP.anh_dai_dien,
                  SP.ten_san_pham
                  FROM DanhGia DG
                  JOIN NguoiDung ND ON DG.nguoi_dung_id = ND.id
                  JOIN SanPham SP ON DG.san_pham_id = SP.id 
                  WHERE DG.hienThi = 1`;
  return await database.queryDatabase(query, []);
};

const remove = async (id) => {
  const query = `UPDATE DanhGia SET hienThi = 0 WHERE id=?`;
  return await database.queryDatabase(query, [id]);
};

module.exports = {
  getAll,
  remove,
};
