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
// Đếm điểm đánh giá theo sao ví dụ 5 4 3 2 1 theo nhóm
const getRatingCounts = async () => {
  const query = `SELECT
    CASE
      WHEN diem_danh_gia > 4 THEN 5
      WHEN diem_danh_gia > 3 THEN 4
      WHEN diem_danh_gia > 2 THEN 3
      WHEN diem_danh_gia > 1 THEN 2
      ELSE 1
    END AS diem,
    COUNT(*) AS so_luong
  FROM shop_clothes.DanhGia
  GROUP BY diem
  ORDER BY diem DESC;
  `;
  return await database.queryDatabase(query, []);
}

module.exports = {
  getAll,
  remove,
  getRatingCounts
};
