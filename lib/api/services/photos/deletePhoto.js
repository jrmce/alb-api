const Db = require('../db');

module.exports = function(id, callback) {
  const sql = `
    DELETE FROM photos
    WHERE id = $1
  `;

  const deletePhotoComplete = function(err) {
    return callback(err);
  };

  return Db.query(sql, [ id ], deletePhotoComplete);
};
