const Bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = function(plain, callback) {
  const hashComplete = function(err, hash) {
    if (err) {
      return callback(err);
    }

    return callback(null, hash);
  };

  Bcrypt.hash(plain, SALT_ROUNDS, hashComplete);
};
