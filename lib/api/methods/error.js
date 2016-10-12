const Boom = require('boom');

module.exports = function(err) {
  if (err.isBoom) {
    return this.response(err);
  }

  return this.response(Boom.badImplementation(err));
};
