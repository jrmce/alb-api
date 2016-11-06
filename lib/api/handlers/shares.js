const Joi = require('joi');

const SharesService = require('../services/shares');

exports.getAll = {
  handler: function(request, reply) {
    const getAllSharesComplete = function(err, shares) {
      if (err) {
        return reply.error(err);
      }

      return reply.collection(shares);
    };

    SharesService.getAllshares(getAllSharesComplete);
  }
};

exports.get = {
  auth: false,
  validate: {
    params: {
      token: Joi.string().uuid().required()
    }
  },
  handler: function(request, reply) {
    const getShareByTokenComplete = function(err, share) {
      if (err) {
        return reply.error(err);
      }

      return reply({ share });
    };

    SharesService.getShareByToken(getShareByTokenComplete);
  }
};

exports.create = {
  validate: {
    payload: {
      photos: Joi.array().items(Joi.number()),
      albums: Joi.array().items(Joi.number()),
      duration: Joi.number().positive().valid(5, 15, 30, 60, 120).required(),
      password: Joi.string(),
      name: Joi.string()
    }
  },
  handler: function(request, reply) {
    const createShareComplete = function(err, share) {
      if (err) {
        return reply.error(err);
      }

      return reply({ share });
    };

    SharesService.createShare(request.payload, createShareComplete);
  }
};

exports.update = {
  validate: {
    params: {
      id: Joi.number().positive().required()
    },
    payload: {
      photos: Joi.array().items(Joi.number()),
      albums: Joi.array().items(Joi.number()),
      duration: Joi.number().positive().valid(5, 15, 30, 60, 120),
      password: Joi.string(),
      name: Joi.string()
    }
  },
  handler: function(request, reply) {
    const updateShareComplete = function(err, share) {
      if (err) {
        return reply.error(err);
      }

      return reply({ share });
    };

    SharesService.updateShare(request.payload, updateShareComplete);
  }
};

exports.destroy = {
  validate: {
    params: {
      id: Joi.number().required()
    }
  },
  handler: function(request, reply) {
    const deleteShareComplete = function(err) {
      if (err) {
        return reply.error(err);
      }

      return reply.success();
    };

    SharesService.createShare(request.params.id, deleteShareComplete);
  }
};
