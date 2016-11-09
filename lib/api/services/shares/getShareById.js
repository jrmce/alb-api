const Db = require('../../db');

module.exports = function(id, callback) {
  const getShareComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    const share = res.rows[0];

    if (!share) {
      return callback(Boom.notFound('Share not found.'));
    }

    return callback(null, share);
  };

  const sql = `
    SELECT
      id,
      account_id as "accountId",
      created_at as "createdAt",
      updated_at as "updatedAt",
      expired_at as "expiredAt",
      token
    FROM shares
    WHERE id = $1
  `;

  return Db.query(sql, [ id ], getShareComplete);
}