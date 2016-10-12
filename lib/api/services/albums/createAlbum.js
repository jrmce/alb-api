const Moment = require('moment');

const Db = require('../../db');
const GetAlbumById = require('./getAlbumById');

module.exports = function(album, callback) {
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

    return GetAlbumById(id, getAlbumComplete);
  };

  const sql = `
    INSERT INTO albums (title, created_at, updated_at)
    VALUES ($1, $2, $3)
    RETURNING id
  `;

  const now = Moment().unix();

  return Db.query(sql, [ album.title, now, now ], createComplete);
};
