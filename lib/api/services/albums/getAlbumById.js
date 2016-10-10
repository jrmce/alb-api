const Boom = require('boom');

const Db = require('../db');
const PhotosService = require('../photos');

module.exports = function(id, callback) {
  let album;

  const sql = `
    SELECT id, title, cover_photo_id as "coverPhotoId"
    FROM albums
    WHERE id = $1
  `;

  const getAllPhotosComplete = function(err, photos) {
    if (err) {
      return callback(err);
    }

    album.photos = photos;

    return callback(null, album);
  };

  const getAlbumComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    album = res.rows[0];

    if (!album) {
      return callback(Boom.notFound('Album not found.'));
    }

    return PhotosService.getAllPhotosByAlbumId(
      album.id,
      getAllPhotosComplete);
  };

  return Db.query(sql, [ id ], getAlbumComplete);
};
