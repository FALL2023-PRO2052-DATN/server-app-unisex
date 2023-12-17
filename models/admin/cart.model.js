const database = require('../../database/database.js');

const removeCartByProductID = async (productID) => {
  const query = `DELETE FROM giohang WHERE san_pham_id = ?`;
  return await database.queryDatabase(query, [productID]);
}

module.exports = {
  removeCartByProductID
}