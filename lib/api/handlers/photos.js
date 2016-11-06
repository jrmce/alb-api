const Joi = require('joi');

const PhotosService = require('../services/photos');

exports.getAll = {
  handler: function(request, reply) {
    const getAllPhotosComplete = function(err, photos) {
      if (err) {
        return reply.error(err);
      }

      return reply.collection(photos);
    };

    PhotosService.getAllPhotos(getAllPhotosComplete);
  }
};

exports.get = {
  validate: {
    params: {
      id: Joi.number().positive()
    }
  },
  handler: function(request, reply) {
    const getPhotoComplete = function(err, photo) {
      if (err) {
        return reply.error(err);
      }

      return reply({ photo });
    };

    PhotosService.getPhotoById(request.params.id, getPhotoComplete);
  }
};

exports.create = {
  validate: {
    payload: {
      data: Joi.string().required()
    }
  },
  payload: {
    maxBytes: 1073741824
  },
  handler: function(request, reply) {
    const createPhotoComplete = function(err, photo) {
      if (err) {
        return reply.error(err);
      }

      return reply({ photo });
    };

    PhotosService.createPhoto(request.payload, createPhotoComplete);
  }
};

exports.destroy = {
  validate: {
    params: {
      id: Joi.number().positive().required()
    }
  },
  handler: function(request, reply) {
    const deletePhotoComplete = function(err) {
      if (err) {
        return reply.error(err);
      }

      return reply.success();
    };

    PhotosService.deletePhoto(request.params.id, deletePhotoComplete);
  }
};

exports.getThumbnail = {
  handler: function(request, reply) {
    const getPhotoComplete = function(err, photo) {
      if (err) {
        return reply.error(err);
      }

      return reply({ photo });
    };

    PhotosService.getPhotoById(request.params.id, getPhotoComplete, 'thumbnail');
  }
};
