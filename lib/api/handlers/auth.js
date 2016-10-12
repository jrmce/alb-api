const Boom = require('boom');
const Joi = require('joi');
const Uuid = require('node-uuid');

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

      return reply({ status: 'ok' }).header('Authorization', token);
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

exports.me = {
  handler: function(request, reply) {
    if (!request.auth.isAuthenticated) {
      return reply.error(Boom.unauthorized());
    }

    return reply({ account: request.auth.credentials });
  }
};
