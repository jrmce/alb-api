const Db = require('../db');
const AlbumsService = require('./index');

module.exports = function(album, callback) {
  const sql = `
    INSERT INTO albums (title)
    VALUES ($1)
    RETURNING id
  `;

  const getAlbumComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res);
  };

  const createComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    const id = res.rows[0].id;

    return AlbumsService.getAlbumById(id, getAlbumComplete);
  };

  return Db.query(sql, [ album.title ], createComplete);
};
