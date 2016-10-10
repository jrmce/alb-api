const Pool = require('pg').Pool;

const config = {
  user: 'postgres',
  database: 'alb',
  host: 'localhost',
  port: 5432
};

const pool = new Pool(config);

exports.query = function(text, values, callback) {
  return pool.query(text, values, callback);
};

exports.register = function(server, options, next) {

  server.decorate('server', 'pg', { pool });
  server.decorate('request', 'pg', { pool });

  pool.on('connect', () => {
    server.log([ 'database', 'connect' ], 'Client connected');
  });

  pool.on('error', (err) => {
    server.log([ 'database', 'error' ], err);
  });

  pool.on('acquire', () => {
    server.log([ 'database', 'acquire' ], 'Client acquired');
  });

  next();
};

exports.register.attributes = {
  name: 'alb-db',
  version: '1.0.0'
};
