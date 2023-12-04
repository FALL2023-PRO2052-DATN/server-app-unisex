const database = require('../../database/database.js');

const getBanners = async () => {
  const query = `SELECT * FROM Banner`;
  return await database.queryDatabase(query, []);
}

const insertBanner = async (imgUrl) => {
  const query = `INSERT INTO Banner (anh_banner) VALUES (?)`;
  return await database.queryDatabase(query, [imgUrl]);
}

const updateBannerStatus = async (data) => {
  const values = [
    data.bannerStatus,
    data.bannerID
  ];
  const query = `UPDATE Banner SET hienThi = ? WHERE id = ?`;
  return await database.queryDatabase(query, values);
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