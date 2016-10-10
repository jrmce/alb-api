const Db = require('../db');

module.exports = function(callback) {
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
