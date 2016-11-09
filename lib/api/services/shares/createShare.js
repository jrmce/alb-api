const Moment = require('moment');
const Uuid = require('node-uuid');

const Db = require('../../db');
const GetShareById = require('./getShareById');

module.exports = function(share, accountId, callback) {
  const getShareComplete = function(err, share) {
    if (err) {
      return callback(err);
    }

    return callback(null, share);
  };

  const createComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    const id = res.rows[0].id;

    return GetShareById(id, getShareComplete);
  };

  const sql = `
    INSERT INTO shares
    (account_id, created_at, updated_at, expired_at, token)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  const now = new Date();
  const expiredAt = Moment(now).add(share.duration, 'minutes').unix(); 

  return Db.query( sql,
    [
      accountId,
      Moment(now).unix(),
      Moment(now).unix(),
      expiredAt,
      Uuid.v4()
    ],
    createComplete);
}