const Db = require('../../db');

module.exports = function(callback) {
  const getAllAlbumsComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows);
  };

  const sql = `
    SELECT
      id,
      title,
      cover_photo_id as "coverPhotoId",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM albums
  `;

  return Db.query(sql, getAllAlbumsComplete);
};
