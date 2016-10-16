const Jwt = require('hapi-auth-jwt2');

const Db = require('./db');
const Routes = require('./routes');
const Methods = require('./methods');
const Auth = require('./auth');

exports.register = function(server, options, next) {
  const sessionsCache = server.cache({
    segment: 'sessions',
    expiresIn: 3 * 24 * 60 * 60 * 1000
  });

  server.app.sessionsCache = sessionsCache;

  server.decorate('reply', 'success', Methods.success);
  server.decorate('reply', 'error', Methods.error);
  server.decorate('reply', 'collection', Methods.collection);

  server.register([ Db, Jwt ], (err) => {

    if (err) {
      server.log('plugins', err);
      next(err);
    }

    server.auth.strategy('jwt', 'jwt', true, Auth.config(sessionsCache));

    server.route(Routes.endpoints);

    next();
  });
};

exports.register.attributes = {
  name: 'alb-api',
  version: '1.0.0'
};
