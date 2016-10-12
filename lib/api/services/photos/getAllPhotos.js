const Db = require('../../db');

module.exports = function(callback) {
  const getAllPhotosComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows);
  };

  const sql = `
    SELECT
      id,
      size,
      type,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM photos
  `;

  return Db.query(sql, getAllPhotosComplete);
};
