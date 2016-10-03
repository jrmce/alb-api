const Jwt = require('hapi-auth-jwt2');

const Db = require('./db');
const Routes = require('./routes');
const Auth = require('./auth');

exports.register = function(server, options, next) {

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
