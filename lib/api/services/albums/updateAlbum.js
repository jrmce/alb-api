const Moment = require('moment');

const Db = require('../../db');
const GetAlbumById = require('./getAlbumById');

module.exports = function(id, album, callback) {
  const getAlbumComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res);
  };

  const updateComplete = function(err) {
    if (err) {
      return callback(err);
    }

    return GetAlbumById(id, getAlbumComplete);
  };

  const sql = `
    UPDATE albums
    SET
      title = $1,
      cover_photo_id = $2,
      updated_at = $3
    WHERE id = $4
  `;

  return Db.query(sql,
    [
      album.title,
      album.coverPhotoId,
      Moment.unix(),
      id
    ],
    updateComplete);
};
