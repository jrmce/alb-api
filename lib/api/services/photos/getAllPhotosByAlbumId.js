const Db = require('../db');

module.exports = function(id, callback) {
  const sql = `
    SELECT photos.id, photos.size, photos.type
    FROM photos
    JOIN albums_photos
    ON photos.id = albums_photos.photo_id
    AND albums_photos.album_id = $1
  `;

  const getAllPhotosComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows);
  };

  return Db.query(sql, [ id ], getAllPhotosComplete);
};
