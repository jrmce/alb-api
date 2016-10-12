const Boom = require('boom');
const Jwt = require('jsonwebtoken');
const Uuid = require('node-uuid');
const Moment = require('moment');

const Db = require('../../db');
const Secure = require('../../secure');

module.exports = function(email, password, callback) {
  let account;

  const compareComplete = function(err, isValid) {
    if (err) {
      return callback(err);
    }

    if (!isValid) {
      return callback(
        Boom.badImplementation('Account or password is invalid.'));
    }

    const session = {
      sessionId: Uuid.v4(),
      accountId: account.id,
      valid: false,
      expire: Moment().add(7, 'days').unix()
    };

    const token = Jwt.sign(session, process.env.JWTSECRET);

    return callback(null, token, session);
  };

  const getAccountComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    account = res.rows[0];

    if (!account) {
      return callback(
        Boom.badImplementation('Account or password is invalid.'));
    }

    const digest = account.digest.toString('utf-8');

    return Secure.compare(password, digest, compareComplete);
  };

  const sql = `
    SELECT
      id,
      email,
      digest,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM accounts
    WHERE email = $1
  `;

  Db.query(sql, [ email ], getAccountComplete);
};
