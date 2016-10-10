const Db = require('../db');

module.exports = function(callback) {
  const sql = `
    SELECT id, title, cover_photo_id as "coverPhotoId"
    FROM albums
  `;

  const getAllAlbumsComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows);
  };

  return Db.query(sql, getAllAlbumsComplete);
};
