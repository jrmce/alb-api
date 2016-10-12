const Db = require('../../db');

module.exports = function(albumId, photoId, callback) {
  const removePhotoComplete = function(err) {
    return callback(err);
  };

  const sql = `
    DELETE FROM albums_photos
    WHERE album_id = $1
    AND photo_id = $2
  `;

  return Db.query(sql, [ albumId, photoId ], removePhotoComplete);
};
