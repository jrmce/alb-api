const Db = require('../db');

module.exports = function(id, callback) {
  const deleteComplete = function(err) {
    return callback(err);
  };

  const sql = `
    DELETE FROM albums
    WHERE id = $1
  `;

  return Db.query(sql, [ id ], deleteComplete);
};
