const Moment = require('moment');

const Db = require('../../db');

module.exports = function(albumId, photoId, callback) {
  const createRelationshipComplete = function(err, id) {
    if (err) {
      return callback(err);
    }

    return callback(null, id);
  };

  const sql = `
    INSERT INTO albums_photos (album_id, photo_id, created_at, updated_at)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;

  const now = Moment().unix();

  return Db.query(sql,
    [
      albumId,
      photoId,
      now,
      now
    ],
    createRelationshipComplete);
};
