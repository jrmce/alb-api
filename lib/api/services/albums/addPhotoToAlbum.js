const Boom = require('boom');

const PhotosService = require('../photos');
const AlbumsService = require('./index');
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

    return AlbumsService.getAlbumById(albumId, getAlbumComplete);
  };

  const createPhotoComplete = function(err, photo) {
    if (err) {
      return callback(err);
    }

    return AlbumsPhotosService.createRelationship(
      albumId,
      photo.id,
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

  return AlbumsService.getAlbumById(albumId, checkAlbumComplete);
};
