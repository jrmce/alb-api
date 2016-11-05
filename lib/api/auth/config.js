const AccountsService = require('../services/accounts');

module.exports = function(cache) {
  const validate = function(decoded, request, callback) {
    const getAccountByIdComplete = function(err, account) {
        if (err) {
          return callback(err, false);
        }

        if (!account) {
          return callback(null, false);
        }

        return callback(null, true, account);
      };

      const cacheResult = function(err, cached) {
        if (err) {
          return callback(err, false);
        }

        if (!cached) {
          return callback(null, false);
        }

        return AccountsService.getAccountById(cached.accountId, getAccountByIdComplete);
      };

      return cache.get(decoded.sessionId, cacheResult);
  };

  return {
    key: process.env.JWTSECRET,
    verifyOptions: { algorithms: [ 'HS256' ] },
    validateFunc: validate
  };
};
