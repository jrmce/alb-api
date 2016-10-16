const Joi = require('joi');

const SessionsService = require('../services/sessions');

exports.authenticate = {
  auth: false,
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required()
    }
  },
  handler: function(request, reply) {
    let token;

    const cacheSet = function(err) {
      if (err) {
        return reply.error(err);
      }

      return reply({ token }).header('Authorization', token);
    };

    const loginComplete = function(err, jwt, session) {
      token = jwt;

      if (err) {
        return reply.error(err);
      }

      return request.server.app.sessionsCache.set(session.sessionId,
        session,
        0,
        cacheSet);
    };

    SessionsService.login(
      request.payload.email,
      request.payload.password,
      loginComplete);
  }
};

exports.logout = {
  validate: {
    payload: {
      token: Joi.string().required()
    }
  },
  handler: function(request, reply) {
    const sessionDropped = function(err) {
      if (err) {
        return reply.error(err);
      }

      return reply.success();
    };

    return request.server.app.sessionsCache.drop(request.payload.token, sessionDropped);
  }
};

exports.me = {
  handler: function(request, reply) {
    return reply({ account: request.auth.credentials });
  }
};
