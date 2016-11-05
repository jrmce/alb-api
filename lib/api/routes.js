const Albums = require('./handlers/albums');
const Photos = require('./handlers/photos');
const Shares = require('./handlers/shares');
const Auth = require('./handlers/auth');
const Accounts = require('./handlers/accounts');

exports.endpoints = [

  /*
    Account routes
  */
  {
    path: '/accounts',
    method: 'GET',
    config: Accounts.getAll
  },
  {
    path: '/accounts',
    method: 'POST',
    config: Accounts.create
  },
  {
    path: '/accounts/{id}',
    method: 'GET',
    config: Accounts.get
  },
  {
    path: '/accounts/{id}',
    method: 'PUT',
    config: Accounts.update
  },
  {
    path: '/accounts/{id}',
    method: 'DELETE',
    config: Accounts.destroy
  },

  /*
    Album routes
  */
  {
    path: '/albums',
    method: 'GET',
    config: Albums.getAll
  },
  {
    path: '/albums',
    method: 'POST',
    config: Albums.create
  },
  {
    path: '/albums/{id}',
    method: 'GET',
    config: Albums.get
  },
  {
    path: '/albums/{id}',
    method: 'PUT',
    config: Albums.update
  },
  {
    path: '/albums/{id}',
    method: 'DELETE',
    config: Albums.destroy
  },
  {
    path: '/albums/{id}/photos',
    method: 'GET',
    config: Albums.getAllPhotos
  },
  {
    path: '/albums/{id}/photos',
    method: 'POST',
    config: Albums.addPhoto
  },
  {
    path: '/albums/{albumId}/photos/{photoId}',
    method: 'DELETE',
    config: Albums.removePhoto
  },

  /*
    Photo routes
  */
  {
    path: '/photos',
    method: 'GET',
    config: Photos.getAll
  },
  {
    path: '/photos',
    method: 'POST',
    config: Photos.create
  },
  {
    path: '/photos/{id}',
    method: 'GET',
    config: Photos.get
  },
  {
    path: '/photos/{id}',
    method: 'DELETE',
    config: Photos.destroy
  },
  {
    path: '/photos/{id}/thumbnail',
    method: 'GET',
    config: Photos.getThumbnail
  },
  /*
    Share routes
  */
  // {
  //   path: '/shares',
  //   method: 'GET',
  //   config: Shares.getAll
  // },
  // {
  //   path: '/shares',
  //   method: 'POST',
  //   config: Shares.create
  // },
  // {
  //   path: '/shares/{id}',
  //   method: 'GET',
  //   config: Shares.get
  // },
  // {
  //   path: '/shares/{id}',
  //   method: 'PUT',
  //   config: Shares.update
  // },
  // {
  //   path: '/shares/{id}',
  //   method: 'DELETE',
  //   config: Shares.destroy
  // },

  /*
    Authentication routes
  */
  {
    path: '/authenticate',
    method: 'POST',
    config: Auth.authenticate
  },
  {
    path: '/logout',
    method: 'POST',
    config: Auth.logout
  },
  {
    path: '/me',
    method: 'GET',
    config: Auth.me
  }
];
