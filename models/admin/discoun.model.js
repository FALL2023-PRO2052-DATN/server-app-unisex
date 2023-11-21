const database = require('../../database/database.js');

const getDiscounts = async () => {
  const query = `SELECT * FROM GiamGia WHERE hienThi = 1;`;
  return await database.queryDatabase(query, []);
}

const insertDiscount = async (data) => {
  const values = [
    data.discountCode,
    data.discountValue
  ];
  const query = `INSERT INTO GiamGia(code, gia_tri) VALUES (?, ?)`;
  return await database.queryDatabase(query, values);
}

const updateDiscount = async (data) => {
  const values = [
    data.discountCode,
    data.discountValue,
    data.discountID
  ];
  const query = `UPDATE GiamGia SET code=?, gia_tri=? WHERE id=?`;
  return await database.queryDatabase(query, values);
}

const removeDiscount = async (discountID) => {
  const query = `UPDATE GiamGia SET hienThi = 0 WHERE id=?`;
  return await database.queryDatabase(query, [discountID]);
}

module.exports = {
  getDiscounts,
  insertDiscount,
  updateDiscount,
  removeDiscount
}