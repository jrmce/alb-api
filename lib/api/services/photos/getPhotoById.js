const Db = require('../db');

module.exports = function(id, callback) {
  const sql = `
    SELECT id, size, type, data
    FROM photos
    WHERE id = $1
  `;

  const getPhotoByIdComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows[0]);
  };

  return Db.query(sql, [ id ], getPhotoByIdComplete);
};
