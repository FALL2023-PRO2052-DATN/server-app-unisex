const database = require('../../database/database.js');

const getProductSizes = async () => {
  const query = `SELECT
                        KTSP.id,
                        SP.id AS san_pham_id,
                        SP.anh_dai_dien,
                        SP.ten_san_pham,
                        KT.ten_kich_thuoc,
                        KTSP.so_luong_ton_kho
                    FROM
                    KichThuoc_SanPham KTSP
                    INNER JOIN
                        SanPham SP ON SP.id = KTSP.san_pham_id
                    INNER JOIN
                        KichThuoc KT ON KTSP.kich_thuoc_id = KT.id
                    WHERE KTSP.hienThi = 1`;
  return await database.queryDatabase(query, []);
}

// Cập nhật lại số lượng khi đơn hàng giao thành công
const updateQuantityProductSize = async ({quantity, productSizeID}) => {
  const values = [
    quantity,
    productSizeID
  ];
  
  const query = `UPDATE KichThuoc_SanPham SET so_luong_ton_kho = ? WHERE id=?`;
  return await database.queryDatabase(query, values);
}

module.exports = {
  getProductSizes,
  updateQuantityProductSize
}

