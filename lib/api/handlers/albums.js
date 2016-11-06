const Joi = require('joi');

const AlbumsService = require('../services/albums');
const PhotosService = require('../services/photos');

exports.getAll = {
  handler: function(request, reply) {
    const getAllAlbumsComplete = function(err, albums) {
      if (err) {
        return reply.error(err);
      }

      return reply.collection(albums);
    };

    AlbumsService.getAllAlbums(getAllAlbumsComplete);
  }
};

exports.get = {
  validate: {
    params: {
      id: Joi.number().positive().required()
    }
  },
  handler: function(request, reply) {
     const getAlbumComplete = function(err, album) {
      if (err) {
        return reply.error(err);
      }

      return reply({ album });
    };

    AlbumsService.getAlbumById(request.params.id, getAlbumComplete);
  }
};

exports.create = {
  validate: {
    payload: {
      title: Joi.string().required()
    }
  },
  handler: function(request, reply) {
    const createAlbumComplete = function(err, album) {
      if (err) {
        return reply.error(err);
      }

      return reply({ album });
    };

    AlbumsService.createAlbum(request.payload, createAlbumComplete);
  }
};

exports.update = {
  validate: {
    params: {
      id: Joi.number().positive().required()
    },
    payload: {
      title: Joi.string(),
      coverPhotoId: Joi.number().positive(),
    }
  },
  handler: function(request, reply) {
    const updateAlbumComplete = function(err, album) {
      if (err) {
        return reply.error(err);
      }

      return reply({ album });
    };

    AlbumsService.updateAlbum(
      request.params.id,
      request.payload,
      updateAlbumComplete);
  }
};

exports.destroy = {
  handler: function(request, reply) {
    const destroyAlbumComplete = function(err) {
      if (err) {
        return reply.error(err);
      }

      return reply({ status: 'ok' });
    };

    AlbumsService.deleteAlbum(request.params.id, destroyAlbumComplete);
  }
};

exports.getAllPhotos = {
  validate: {
    params: {
      id: Joi.number().positive().required()
    }
  },
  handler: function(request, reply) {
    const getAllPhotosComplete = function(err, photos) {
      if (err) {
        return reply.error(err);
      }

      return reply.collection(photos);
    };

    PhotosService.getAllPhotosByAlbumId(
      request.params.id,
      getAllPhotosComplete);
  }
};

exports.addPhoto = {
  validate: {
    params: {
      id: Joi.number().positive().required()
    },
    payload: {
      data: Joi.string().required()
    }
  },
  payload: {
    maxBytes: 1073741824
  },
  handler: function(request, reply) {
    const addPhotoToAlbumComplete = function(err, album) {
      if (err) {
        return reply.error(err);
      }

      return reply({ album });
    };

    AlbumsService.addPhotoToAlbum(
      request.params.id,
      request.payload,
      addPhotoToAlbumComplete);
  }
};

exports.removePhoto = {
  validate: {
    params: {
      albumId: Joi.number().positive().required(),
      photoId: Joi.number().positive().required()
    }
  },
  handler: function(request, reply) {
    const removePhotoComplete = function(err) {
      if (err) {
        return reply.error(err);
      }

      return reply.success();
    };

    AlbumsService.removePhotoFromAlbum(
      request.params.albumId,
      request.params.photoId,
      removePhotoComplete);
  }
};
