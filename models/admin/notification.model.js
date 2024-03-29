const database = require('../../database/database');

const insertNotification = async (data) => {
  const query = `INSERT INTO ThongBao (noi_dung, hinh_anh, tieu_de, nguoi_dung_id) VALUES (?, ?, ?, ?);`;
  const values = [
    data.content,
    data.imageUrl,
    data.title,
    data.userID
  ];
  return database.queryDatabase(query, values);
}

module.exports = {
  insertNotification
}