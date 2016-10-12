const Hapi = require('hapi');
const Good = require('good');

const Api = require('./api');

const server = new Hapi.Server({
  cache: {
    engine: require('catbox-redis'),
    partition: 'alb'
  }
});

server.connection({
  host: 'localhost',
  port: 8080
});

const goodOpts = {
  reporters: {
    console: [ {
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [ {
        response: '*',
        log: '*'
      } ]
    }, {
      module: 'good-console'
    }, 'stdout' ]
  }
};

server.register([ Api, { register: Good, options: goodOpts } ], (err) => {
    if (err) {
      throw err;
    }

    server.start((err) => {
      if (err) {
        throw err;
      }

      server.log('info', `Server running at: ${server.info.uri}`);
    });
});
