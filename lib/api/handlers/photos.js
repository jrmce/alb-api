const Boom = require('boom');
const Joi = require('joi');

const PhotoService = require('../services/photos');

exports.getAll = {
  auth: false,
  handler: function(request, reply) {
    const getAllPhotosComplete = function(err, photos) {
      if (err) {
        return reply(Boom.badImplementation(err));
      }

      return reply({ photos });
    };

    PhotoService.getAll(getAllPhotosComplete);
  }
};

exports.get = {
  validate: {
    params: {
      id: Joi.number().positive()
    }
  },
  auth: false,
  handler: function(request, reply) {
    const getPhotoComplete = function(err, photo) {
      if (err) {
        return reply(Boom.badImplementation(err));
      }
      if (!photo) {
        return reply(Boom.notFound());
      }

      return reply({ photo });
    };

    PhotoService.getPhoto(request.params.id, getPhotoComplete);
  }
};

exports.create = {
  validate: {
    payload: {
      data: Joi.string().required(),
      type: Joi.string().required(),
      size: Joi.number().positive().required()
    }
  },
  auth: false,
  handler: function(request, reply) {
    const createPhotoComplete = function(err, photo) {
      if (err) {
        return reply(Boom.badImplementation(err));
      }

      return reply({ photo });
    };

    PhotoService.createPhoto(request.payload, createPhotoComplete);
  }
};

exports.destroy = {
  validate: {
    params: {
      id: Joi.number().positive().required()
    }
  },
  auth: false,
  handler: function(request, reply) {
    const deletePhotoComplete = function(err) {
      if (err) {
        return reply(Boom.badImplementation(err));
      }

      return reply({ status: 'ok' });
    };

    PhotoService.deletePhoto(request.params.id, deletePhotoComplete);
  }
};