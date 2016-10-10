const AlbumsPhotosService = require('../albumsPhotos');

module.exports = function(albumId, photoId, callback) {
  const removeComplete = function(err) {
    return callback(err);
  };

  return AlbumsPhotosService.removePhotoFromAlbum(
    albumId,
    photoId,
    removeComplete);
};
