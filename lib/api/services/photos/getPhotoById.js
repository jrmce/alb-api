const Boom = require('boom');
const Path = require('path');
const Fs = require('fs');

const Db = require('../../db');

module.exports = function(id, callback, size = 'original') {
  let photo;

  const readFileComplete = function(err, buff) {
    photo.data = new Buffer(buff).toString('base64');

    delete photo.originalFile;
    delete photo.thumbnailFile;

    return callback(null, photo);
  };

  const getPhotoByIdComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    photo = res.rows[0];

    if (!photo) {
      return callback(Boom.notFound('Photo not found.'));
    }

    let photoPath;

    if (size === 'original') {
      photoPath = Path.resolve('lib', 'photos', `${photo.originalFile}.${photo.type}`);
    } else {
      photoPath = Path.resolve('lib', 'photos', `${photo.thumbnailFile}.${photo.type}`);
    }

    Fs.readFile(photoPath, readFileComplete);
  };

  const sql = `
    SELECT
      photos.id,
      photos.size,
      photos.original_file as "originalFile",
      photos.thumbnail_file as "thumbnailFile",
      photo_types.type,
      photos.created_at as "createdAt",
      photos.updated_at as "updatedAt"
    FROM photos
    JOIN photo_types
    ON photos.type_id = photo_types.id
    WHERE photos.id = $1
  `;

  return Db.query(sql, [ id ], getPhotoByIdComplete);
};
