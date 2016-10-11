const Boom = require('boom');
const Jwt = require('hapi-auth-jwt2');

const Db = require('./db');
const Routes = require('./routes');
const Auth = require('./auth');

exports.register = function(server, options, next) {

  const success = function() {
    return this.response({ status: 'ok' });
  };

  const error = function(err) {
    if (err.isBoom) {
      return this.response(err);
    }

    return this.response(Boom.badImplementation(err));
  };

  const collection = function(items) {
    return this.response({ items });
  };

  server.decorate('reply', 'success', success);
  server.decorate('reply', 'error', error);
  server.decorate('reply', 'collection', collection);

  server.register([ Db, Jwt ], (err) => {

    if (err) {
      server.log('plugins', err);
      next(err);
    }

    const jwtConfig = {
      key: process.env.JWTSECRET,
      validateFunc: Auth.validate,
      verifyOptions: { algorithms: [ 'HS256' ] }
    };

    server.auth.strategy('jwt', 'jwt', true, jwtConfig);

    server.route(Routes.endpoints);

    next();
  });
};

exports.register.attributes = {
  name: 'alb-api',
  version: '1.0.0'
};
