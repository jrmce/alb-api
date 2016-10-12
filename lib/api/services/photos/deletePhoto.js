const Db = require('../../db');

module.exports = function(id, callback) {
  const deletePhotoComplete = function(err) {
    return callback(err);
  };

  const sql = `
    DELETE FROM photos
    WHERE id = $1
  `;

  return Db.query(sql, [ id ], deletePhotoComplete);
};
