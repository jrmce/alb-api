const Db = require('../db');
const AlbumsService = require('./index');

module.exports = function(id, album, callback) {
  const sql = `
    UPDATE albums
    SET title = $1, cover_photo_id = $2
    WHERE id = $3
  `;

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

    return AlbumsService.getAlbumById(id, getAlbumComplete);
  };

  return Db.query(sql, [ album.title, album.coverPhotoId, id ], updateComplete);
};
