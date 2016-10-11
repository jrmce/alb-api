const Boom = require('boom');

const Db = require('../db');

module.exports = function(id, callback) {
  const getAccountComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    const account = res.rows[0];

    if (!account) {
      return callback(Boom.notFound('Account not found.'));
    }

    return callback(null, account);
  };

  const sql = `
    SELECT
      id,
      email,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM accounts
    WHERE id = $1
  `;

  return Db.query(sql, [ id ], getAccountComplete);
};
