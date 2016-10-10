const Db = require('../db');

module.exports = function(id, callback) {
  const sql = `
    DELETE FROM albums
    WHERE id = $1
  `;

  const deleteComplete = function(err) {
    return callback(err);
  };

  return Db.query(sql, [ id ], deleteComplete);
};
