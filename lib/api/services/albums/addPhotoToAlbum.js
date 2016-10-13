const Boom = require('boom');

const PhotosService = require('../photos');
const GetAlbumById = require('./getAlbumById');
const AlbumsPhotosService = require('../albumsPhotos');

module.exports = function(albumId, photo, callback) {
  const getAlbumComplete = function(err, album) {
    if (err) {
      return callback(err);
    }

    return callback(null, album);
  };

  const createRelationshipComplete = function(err) {
    if (err) {
      return callback(err);
    }

    return GetAlbumById(albumId, getAlbumComplete);
  };

  const createPhotoComplete = function(err, createdPhoto) {
    if (err) {
      return callback(err);
    }

    return AlbumsPhotosService.createRelationship(
      albumId,
      createdPhoto.id,
      createRelationshipComplete);
  };

  const checkAlbumComplete = function(err, album) {
    if (err) {
      return callback(err);
    }

    if (!album) {
      return callback(Boom.notFound('Album not found.'));
    }

    return PhotosService.createPhoto(photo, createPhotoComplete);
  };

  return GetAlbumById(albumId, checkAlbumComplete);
};
