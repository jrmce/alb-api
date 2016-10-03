const Db = require('../db');

exports.createRelationship = function(albumId, photoId) {
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
