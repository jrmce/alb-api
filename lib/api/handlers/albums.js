const Boom = require('boom');
const Joi = require('joi');

const AlbumsService = require('../services/albums');

exports.getAll = {
  auth: false,
  handler: function(request, reply) {
    const getAllAlbumsComplete = function(err, albums) {
      if (err) {
        return reply(Boom.badImplementation(err));
      }

      return reply({ albums });
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
  auth: false,
  handler: function(request, reply) {
     const getAlbumComplete = function(err, album) {
      if (err) {
        return reply(Boom.badImplementation(err));
      }

      if (!album) {
        return reply(Boom.notFound());
      }

      return reply(album);
    };

    AlbumsService.getAlbum(request.params.id, getAlbumComplete);
  }
};

exports.create = {
  validate: {
    payload: {
      title: Joi.string().required(),
      coverPhotoId: Joi.number().positive(),
      photoIds: Joi.array().items(Joi.number().positive())
    }
  },
  auth: false,
  handler: function(request, reply) {
    const createAlbumComplete = function(err, album) {
      if (err) {
        return reply(Boom.badImplementation(err));
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
      title: Joi.string().required(),
      coverPhotoId: Joi.number().positive(),
      photoIds: Joi.array().items(Joi.number().positive())
    }
  },
  auth: false,
  handler: function(request, reply) {
    const updateAlbumComplete = function(err, album) {
      if (err) {
        return reply(Boom.badImplementation(err));
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
  auth: false,
  handler: function(request, reply) {
    const destroyAlbumComplete = function(err) {
      if (err) {
        return reply(Boom.badImplementation(err));
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
  auth: false,
  handler: function(request, reply) {
    const getAllPhotosComplete = function(err, photos) {
      if (err) {
        return reply(Boom.badImplementation(err));
      }

      return reply({ photos });
    };

    AlbumsService.getAllAlbumPhotos(request.params.id, getAllPhotosComplete);
  }
};

exports.getPhoto = {
  validate: {
    params: {
      albumId: Joi.number().positive().required(),
      photoId: Joi.number().positive().required()
    }
  },
  auth: false,
  handler: function(request, reply) {
    const getAlbumPhotoComplete = function(err, photo) {
      if (err) {
        return reply(Boom.badImplementation(err));
      }

      if (!photo) {
        return Boom.notFound();
      }

      return reply({ photo });
    };

    AlbumsService.getAlbumPhoto(
      request.params.albumId,
      request.params.photoId,
      getAlbumPhotoComplete);
  }
};

exports.addPhoto = {
  validate: {
    params: {
      id: Joi.number().positive().required()
    },
    payload: {
      data: Joi.string().required(),
      type: Joi.string().required(),
      size: Joi.number().positive().required()
    }
  },
  auth: false,
  handler: function(request, reply) {
    const addPhotoToAlbumComplete = function(err, album) {
      if (err) {
        return reply(Boom.badImplementation(err));
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
  auth: false,
  handler: function(request, reply) {
    const removePhotoComplete = function(err) {
      if (err) {
        return reply(Boom.badImplementation(err));
      }

      return reply({ status: 'ok' });
    };

    AlbumsService.removePhotoFromAlbum(
      request.params.albumId,
      request.params.photoId,
      removePhotoComplete);
  }
};
