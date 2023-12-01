const database = require('../../database/database.js');

const getBanners = async () => {
  const query = `SELECT * FROM Banner`;
  return await database.queryDatabase(query, []);
}

const insertBanner = async (imgUrl) => {
  const query = `INSERT INTO Banner (anh_banner) VALUES (?)`;
  return await database.queryDatabase(query, [imgUrl]);
}

const updateBannerStatus = async ({ bannerID, bannerStatus }) => {
  const query = `UPDATE Banner SET hienThi = ? WHERE id = ?`;
  return await database.queryDatabase(query, [bannerStatus, bannerID]);
}

const removeBanner = async (bannerID) => {
  const query = `DELETE FROM Banner WHERE id = ?`;
  return await database.queryDatabase(query, [bannerID]);
}

module.exports = {
  getBanners,
  insertBanner,
  updateBannerStatus,
  removeBanner
}