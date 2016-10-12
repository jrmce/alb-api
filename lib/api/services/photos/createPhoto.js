const Moment = require('moment');
const Fs = require('fs');
const Uuid = require('node-uuid');
const Path = require('path');

const Db = require('../../db');
const GetPhotoById = require('./getPhotoById');

module.exports = function(photo, callback) {
  const binaryData = new Buffer(photo.data, 'base64');
  const originalFilename = `${Uuid.v4()}.${photo.type}`;
  const thumbnailFilename = `${Uuid.v4()}.${photo.type}`;
  const photosPath = Path.resolve('../../../photos');

  const getPhotoComplete = function(err, res) {
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

    return GetPhotoById(id, getPhotoComplete);
  };

  const writeThumbnailComplete = function(err) {
    if (err) {
      return callback(err);
    }

    const sql = `
      INSERT INTO photos (size, original_file, thumbnail_file, created_at, updated_at, type_id)
      VALUES ($1, $2, $3, $4, $5, (SELECT id FROM photo_types WHERE type = $6))
      RETURNING id
    `;

    const now = Moment().unix();

    return Db.query( sql,
      [
        photo.size,
        originalFilename,
        thumbnailFilename,
        now,
        now,
        photo.type
      ],
      createComplete);
  };

  const writeOriginalComplete = function(err) {
    if (err) {
      return callback(err);
    }

    return Fs.writeFile(Path.resolve(photosPath, thumbnailFilename), binaryData, writeThumbnailComplete);
  };

  return Fs.writeFile(Path.resolve(photosPath, originalFilename), binaryData, writeOriginalComplete);
};
