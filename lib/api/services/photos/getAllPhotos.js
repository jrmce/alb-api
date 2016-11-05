const Db = require('../../db');

module.exports = function(callback) {
  const getAllPhotosComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows);
  };

  const sql = `
    SELECT
      photos.id,
      photos.size,
      photo_types.type,
      photos.created_at as "createdAt",
      photos.updated_at as "updatedAt"
    FROM photos
    JOIN photo_types
    ON photos.type_id = photo_types.id
  `;

  return Db.query(sql, getAllPhotosComplete);
};
