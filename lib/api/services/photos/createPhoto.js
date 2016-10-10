const Db = require('../db');
const PhotosService = require('./index');

module.exports = function(photo, callback) {
  const sql = `
    INSERT INTO photos (size, type, data)
    VALUES ($1, $2, $3)
    RETURNING id
  `;

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

    return PhotosService.getPhotoById(id, getPhotoComplete);
  };

  return Db.query(
    sql,
    [ photo.size, photo.type, photo.data ],
    createComplete);
};
