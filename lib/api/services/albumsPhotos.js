const Db = require('../db');

exports.createRelationship = function(albumId, photoId, callback) {
  const sql = `
    INSERT INTO albums_photos (album_id, photo_id)
    VALUES ($1, $2)
    RETURNING id
  `;

  const createRelationshipComplete = function(err, id) {
    if (err) {
      return callback(err);
    }

    return callback(null, id);
  };

  return Db.query(sql, [ albumId, photoId ], createRelationshipComplete);
};

exports.removePhotoFromAlbum = function(albumId, photoId, callback) {
  const sql = `
    DELETE FROM albums_photos
    WHERE album_id = $1
    AND photo_id = $2
  `;

  const removePhotoComplete = function(err) {
    return callback(err);
  };

  return Db.query(sql, [ albumId, photoId ], removePhotoComplete);
};
