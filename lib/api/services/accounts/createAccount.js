const Moment = require('moment');

const Db = require('../../db');
const GetAccountById = require('./getAccountById');
const Secure = require('../../secure');

module.exports = function(account, callback) {
  const getAccountComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res);
  };

  const createComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    const id = res.rows[0].id;

    return GetAccountById(id, getAccountComplete);
  };

  const encryptComplete = function(err, digest) {
    if (err) {
      return callback(err);
    }

    const sql = `
      INSERT INTO accounts (email, digest, created_at, updated_at)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;

    const now = Moment().unix();
    console.log(now);

    return Db.query(sql, [ account.email, digest, now, now ], createComplete);
  };

  return Secure.encrypt(account.password, encryptComplete);
};
