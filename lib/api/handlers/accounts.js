const Joi = require('joi');

const AccountsService = require('../services/accounts');

exports.getAll = {
  auth: false,
  handler: function(request, reply) {
    const getAllAccountsComplete = function(err, accounts) {
      if (err) {
        return reply.error(err);
      }

      return reply.collection(accounts);
    };

    AccountsService.getAllAccounts(getAllAccountsComplete);
  }
};

exports.get = {
  validate: {
    params: {
      id: Joi.number().positive().required()
    }
  },
  auth: false,
  handler: function(request, reply) {
    const getAccountByIdComplete = function(err, account) {
      if (err) {
        return reply.error(err);
      }

      return reply({ account });
    };

    AccountsService.getAccountById(getAccountByIdComplete);
  }
};

exports.create = {
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      passwordConfirmation: Joi.any().valid(Joi.ref('password'))
    }
  },
  auth: false,
  handler: function(request, reply) {
    const createAccountComplete = function(err, account) {
      if (err) {
        return reply.error(err);
      }

      return reply({ account });
    };

    AccountsService.createAccount(request.payload, createAccountComplete);
  }
};

exports.update = {
  validate: {
    payload: {
      email: Joi.string().email(),
      password: Joi.string().min(8),
      passwordConfirmation: Joi.any().valid(Joi.ref('password'))
    }
  },
  auth: false,
  handler: function(request, reply) {
    const updateAccountComplete = function(err, account) {
      if (err) {
        return reply.error(err);
      }

      return reply({ account });
    };

    AccountsService.updateAccount(request.payload, updateAccountComplete);
  }
};

exports.destroy = {
  validate: {
    params: {
      id: Joi.number().positive().required()
    }
  },
  auth: false,
  handler: function(request, reply) {
    const deleteAccountComplete = function(err) {
      if (err) {
        return reply.error(err);
      }

      return reply.success();
    };

    AccountsService.deleteAccount(request.params.id, deleteAccountComplete);
  }
};
