const Moment = require('moment');
const Fs = require('fs');
const Uuid = require('node-uuid');
const Path = require('path');
const FileType = require('file-type');

const Db = require('../../db');
const GetPhotoById = require('./getPhotoById');

const extractDataOnly = function(base64String) {
  // Check if this is a javascript FileReader image.
  // If so, it probably has some extra metadata
  if (base64String.indexOf(',') > -1) {
    return base64String.split(',')[1];
  }

  return base64String;
};

module.exports = function(photo, callback) {
  const binaryData = new Buffer(extractDataOnly(photo.data), 'base64');
  const filetype = FileType(binaryData);
  const originalFilename = Uuid.v4();
  const thumbnailFilename = Uuid.v4();
  const filesize = binaryData.byteLength;
  const photosPath = Path.resolve('lib', 'photos');

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
        filesize,
        originalFilename,
        thumbnailFilename,
        now,
        now,
        filetype.ext
      ],
      createComplete);
  };

  const writeOriginalComplete = function(err) {
    if (err) {
      return callback(err);
    }

    return Fs.writeFile(Path.resolve(photosPath, `${thumbnailFilename}.${filetype.ext}`), binaryData, writeThumbnailComplete);
  };

  return Fs.writeFile(Path.resolve(photosPath, `${originalFilename}.${filetype.ext}`), binaryData, writeOriginalComplete);
};
