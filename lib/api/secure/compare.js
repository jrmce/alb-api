const Bcrypt = require('bcrypt');

module.exports = function(plain, hash, callback) {
  const compareComplete = function(err, isValid) {
    if (err) {
      return callback(err);
    }

    return callback(null, isValid);
  };

  Bcrypt.compare(plain, hash, compareComplete);
};
