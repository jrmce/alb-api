const Moment = require('moment');

const Db = require('../db');
const GetAccountById = require('./getAccountById');

module.exports = function(id, account, callback) {
  const getAlbumComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res);
  };

  const updateComplete = function(err) {
    if (err) {
      return callback(err);
    }

    return GetAccountById(id, getAlbumComplete);
  };

  const sql = `
    UPDATE accounts
    SET
      email = $1,
      updated_at = $2
    WHERE id = $3
  `;

  return Db.query(sql, [ account.email, Moment.unix(), id ], updateComplete);
};
