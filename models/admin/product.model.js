const database = require('../../database/database.js');

const getProducts = async () => {
  const query = `SELECT
                    SP.id AS san_pham_id,
                    SP.anh_dai_dien AS hinh_anh,
                    SP.ten_san_pham,
                    SP.gia_ban,
                    SP.giam_gia,
                    SP.noi_bat,
                    SP.moi_nhat,
                    SP.mo_ta_chi_tiet,
                    DM.ten_danh_muc,
                    GROUP_CONCAT(KT.ten_kich_thuoc SEPARATOR ', ') AS kich_thuoc
                    FROM SanPham SP
                    INNER JOIN DanhMuc DM ON SP.danh_muc_id = DM.id
                    LEFT JOIN KichThuoc_SanPham KTS ON SP.id = KTS.san_pham_id AND KTS.hienThi = 1
                    LEFT JOIN KichThuoc KT ON KTS.kich_thuoc_id = KT.id
                    WHERE SP.hienThi = 1
                    GROUP BY SP.id`;
  return await database.queryDatabase(query, []);
}

// Lấy danh sách sản phẩm theo mã danh mục
const getProductsByCategoryID = async (categoryID) => {
  const query = 'SELECT * FROM SanPham WHERE danh_muc_id = ? AND hienThi = 1';
  return await database.queryDatabase(query, [categoryID]);
}

const getProductByID = async (productID) => {
  const query = `SELECT
                    SP.id AS san_pham_id,
                    SP.anh_dai_dien AS hinh_anh,
                    SP.ten_san_pham,
                    SP.gia_ban,
                    SP.giam_gia,
                    SP.noi_bat,
                    SP.moi_nhat,
                    SP.mo_ta_chi_tiet,
                    SP.danh_muc_id,
                    DM.ten_danh_muc,
                    GROUP_CONCAT(KT.ten_kich_thuoc SEPARATOR ', ') AS kich_thuoc
                    FROM SanPham SP
                    INNER JOIN DanhMuc DM ON SP.danh_muc_id = DM.id
                    LEFT JOIN KichThuoc_SanPham KTS ON SP.id = KTS.san_pham_id AND KTS.hienThi = 1
                    LEFT JOIN KichThuoc KT ON KTS.kich_thuoc_id = KT.id AND KT.hienThi = 1
                    WHERE SP.hienThi = 1 AND SP.id = ?
                    GROUP BY SP.id`;
  return await database.queryDatabase(query, [productID]);
}

const insertProduct = async (data) => {
  const query = `INSERT INTO SanPham (ten_san_pham, anh_dai_dien, gia_ban, giam_gia, noi_bat, moi_nhat, mo_ta_chi_tiet, danh_muc_id) VALUES (? , ?, ?, ?, ? , ?, ?, ?);`
  const values = [
    data.name,
    data.imageUrl,
    data.price,
    data.discount,
    data.outstanding,
    data.selling,
    data.description,
    data.idCategory
  ];
  return await database.queryDatabase(query, values);
}

const updateProduct = async (data) => {
  const values = [
    data.name,
    data.price,
    data.discount,
    data.outstanding,
    data.selling,
    data.description,
    data.idCategory,
    data.imgUrl,
    data.productID
  ];
  const query = `UPDATE SanPham SET ten_san_pham = ?, gia_ban = ?, giam_gia = ?, noi_bat = ?, moi_nhat = ?, mo_ta_chi_tiet = ?, danh_muc_id =?, anh_dai_dien =? WHERE id = ?`;
  return await database.queryDatabase(query, values);
}

const removeProduct = async (productID) => {
  const query = `UPDATE SanPham SET hienThi = 0 WHERE id=?`;
  return await database.queryDatabase(query, [productID]);
}

module.exports = {
  getProducts,
  getProductByID,
  getProductsByCategoryID,
  insertProduct,
  updateProduct,
  removeProduct
}