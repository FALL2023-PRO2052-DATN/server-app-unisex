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
                        shop_clothes.SanPham SP
                    INNER JOIN
                        shop_clothes.KichThuoc_SanPham KTSP ON SP.id = KTSP.san_pham_id
                    INNER JOIN
                        shop_clothes.KichThuoc KT ON KTSP.kich_thuoc_id = KT.id
                    WHERE KTSP.hienThi = 1`;
  return await database.queryDatabase(query, []);
}

const getProductSizesByProductID = async (idProduct) => {
  const query = `SELECT
                        KTSP.id,
                        SP.anh_dai_dien,
                        SP.ten_san_pham,
                        KTSP.kich_thuoc_id,
                        KT.ten_kich_thuoc,
                        KTSP.so_luong_ton_kho
                    FROM
                        shop_clothes.SanPham SP
                    INNER JOIN
                        shop_clothes.KichThuoc_SanPham KTSP ON SP.id = KTSP.san_pham_id
                    INNER JOIN
                        shop_clothes.KichThuoc KT ON KTSP.kich_thuoc_id = KT.id
                    WHERE KTSP.hienThi = 1 AND SP.id = ?`;
  return await database.queryDatabase(query, [idProduct]);
}

const getProductSizesBySizeId = async (sizeID) => {
  const query = `SELECT * FROM KichThuoc_SanPham WHERE kich_thuoc_id =? AND hienThi = 1`
  return await database.queryDatabase(query, [sizeID]);
}

const insertProductSize = async (data) => {
  const values = [
    data.size,
    data.idProduct,
    data.quantity
  ];
  const query = `INSERT INTO KichThuoc_SanPham (kich_thuoc_id, san_pham_id, so_luong_ton_kho) VALUES (?, ?, ?)`
  return await database.queryDatabase(query, values);
}

const updateProductSize = async (data) => {
  const values = [
    data.size,
    data.idProduct,
    data.quantity,
    data.productSizeID
  ];
  const query = `UPDATE KichThuoc_SanPham SET kich_thuoc_id =?, san_pham_id=?, so_luong_ton_kho=? WHERE id=?`;
  return await database.queryDatabase(query, values);
}

const updateQuatity = async (productSizeID, quantity) => {
  const values = [
    quantity,
    productSizeID
  ];
  const query = `UPDATE KichThuoc_SanPham SET so_luong_ton_kho=? WHERE id=?`;
  return await database.queryDatabase(query, values);
}

const removeProductSize = async (id) => {
  const query = `DELETE FROM KichThuoc_SanPham WHERE id = ?`;
  return await database.queryDatabase(query, [id]);
}

const removeByProductID = async (productID) => {
  const query = `DELETE FROM KichThuoc_SanPham WHERE san_pham_id = ?`;
  return await database.queryDatabase(query, [productID]);
}

// Lấy tổng số lượng tồn kho
const getTotalInventoryProduct = async () => {
  const query = `SELECT SUM(so_luong_ton_kho) AS tong_ton_kho
    FROM shop_clothes.KichThuoc_SanPham WHERE hienThi = 1`;
  return await database.queryDatabase(query, []);
}

const getSumQuantityProductSizes = async () => {
  const query = `SELECT
        SP.id,
        SP.ten_san_pham,
        SUM(KTSP.so_luong_ton_kho) AS tong_ton_kho
    FROM
        shop_clothes.KichThuoc_SanPham KTSP 
    INNER JOIN
        shop_clothes.SanPham SP ON SP.id = KTSP.san_pham_id
    WHERE
        KTSP.hienThi = 1
    GROUP BY
    SP.id;
`;
  return await database.queryDatabase(query, []);
}

module.exports = {
  getProductSizes,
  getProductSizesByProductID,
  getProductSizesBySizeId,
  insertProductSize,
  updateProductSize,
  updateQuatity,
  removeProductSize,
  removeByProductID,
  getTotalInventoryProduct,
  getSumQuantityProductSizes
}