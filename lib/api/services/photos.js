const Db = require('../db');

// Private functions

const findPhotoById = function(id, callback) {
  const sql = `
    SELECT id, size, type, data
    FROM photos
    WHERE id = $1
  `;

  const findPhotoByIdComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows[0]);
  };

  return Db.query(sql, [ id ], findPhotoByIdComplete);
};

// Exported functions

exports.getAllPhotos = function(callback) {
  const sql = `
    SELECT id, size, type
    FROM photos
  `;

  const getAllPhotosComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows);
  };

  return Db.query(sql, getAllPhotosComplete);
};

exports.getPhoto = function(id, callback) {
  return findPhotoById(id, callback);
};

exports.createPhoto = function(photo, callback) {
  const sql = `
    INSERT INTO photos (size, type, data)
    VALUES ($1, $2, $3)
    RETURNING id
  `;

  const findPhotoComplete = function(err, res) {
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

    return findPhotoById(id, findPhotoComplete);
  };

  return Db.query(
    sql,
    [ photo.size, photo.type, photo.data ],
    createComplete);
};

exports.deletePhoto = function(id, callback) {
  const sql = `
    DELETE FROM photos
    WHERE id = $1
  `;

  const deletePhotoComplete = function(err) {
    return callback(err);
  };

  return Db.query(sql, [ id ], deletePhotoComplete);
};
