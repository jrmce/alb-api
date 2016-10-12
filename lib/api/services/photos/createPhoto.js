const Moment = require('moment');

const Db = require('../../db');
const GetPhotoById = require('./getPhotoById');

module.exports = function(photo, callback) {
  const getPhotoComplete = function(err, res) {
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

    return GetPhotoById(id, getPhotoComplete);
  };

  const sql = `
    INSERT INTO photos (size, type, data, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  const now = Moment().unix();

  return Db.query( sql,
    [
      photo.size,
      photo.type,
      photo.data,
      now,
      now
    ],
    createComplete);
};
