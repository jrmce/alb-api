const Boom = require('boom');

const Db = require('../../db');

module.exports = function(id, callback) {
  const getPhotoByIdComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    const photo = res.rows[0];

    if (!photo) {
      return callback(Boom.notFound('Photo not found.'));
    }

    return callback(null, photo);
  };

  const sql = `
    SELECT
      id,
      size,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM photos
    WHERE id = $1
  `;

  return Db.query(sql, [ id ], getPhotoByIdComplete);
};
