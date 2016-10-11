const Db = require('../db');

module.exports = function(callback) {
  const getAllAccountsComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows);
  };

  const sql = `
    SELECT
      id,
      email,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM accounts
  `;

  return Db.query(sql, getAllAccountsComplete);
};
