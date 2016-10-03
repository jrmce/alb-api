const Boom = require('boom');

const Db = require('../db');
const PhotoService = require('./photos');
const AlbumsPhotosService = require('./albumsPhotos');

// Private functions

const findAllPhotosByAlbumId = function(id, callback) {
  const sql = `
    SELECT photos.id, photos.size, photos.type
    FROM photos
    JOIN albums_photos
    ON photos.id = albums_photos.photo_id
    AND albums_photos.album_id = $1
  `;

  const findAllPhotosComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows);
  };

  return Db.query(sql, [ id ], findAllPhotosComplete);
};

const findAlbumById = function(id, callback) {
  let album;

  const sql = `
    SELECT id, title, cover_photo_id as "coverPhotoId"
    FROM albums
    WHERE id = $1
  `;

  const findAllPhotosComplete = function(err, photos) {
    if (err) {
      return callback(err);
    }

    album.photos = photos;

    return callback(null, album);
  };

  const findAlbumComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    album = res.rows[0];

    if (!album) {
      return callback(Boom.notFound('Album not found.'));
    }

    return findAllPhotosByAlbumId(album.id, findAllPhotosComplete);
  };

  return Db.query(sql, [ id ], findAlbumComplete);
};

// Exported functions

exports.getAllAlbums = function(callback) {
  const sql = `
    SELECT id, title, cover_photo_id as "coverPhotoId"
    FROM albums
  `;

  return Db.query(sql, (err, res) => {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows);
  });
};

exports.getAlbum = function(id, callback) {
  return findAlbumById(id, callback);
};

exports.createAlbum = function(album, callback) {
  const sql = `
    INSERT INTO albums (title)
    VALUES ($1)
    RETURNING id
  `;

  const findAlbumComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res);
  };

  const createComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    const id = res.rows[0].id;

    return findAlbumById(id, findAlbumComplete);
  };

  return Db.query(sql, [ album.title ], createComplete);
};

exports.updateAlbum = function(id, album, callback) {
  const sql = `
    UPDATE albums
    SET title = $1, cover_photo_id = $2
    WHERE id = $3
  `;

  const findAlbumComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res);
  };

  const updateComplete = function(err) {
    if (err) {
      return callback(err);
    }

    return findAlbumById(id, findAlbumComplete);
  };

  return Db.query(sql, [ album.title, album.coverPhotoId, id ], updateComplete);
};

exports.deleteAlbum = function(id, callback) {
  const sql = `
    DELETE FROM albums
    WHERE id = $1
  `;

  const deleteComplete = function(err) {
    return callback(err);
  };

  return Db.query(sql, [ id ], deleteComplete);
};

exports.getAllAlbumPhotos = function(albumId, callback) {
  return findAllPhotosByAlbumId(albumId, callback);
};

exports.getAlbumPhoto = function(albumId, photoId, callback) {
  const getPhotoComplete = function(err, photo) {
    if (err) {
      return callback(err);
    }

    if (!photo) {
      return callback(Boom.notFound('Photo not found.'));
    }

    return callback(null, photo);
  };

  const getAlbumComplete = function(err, album) {
    if (err) {
      return callback(err);
    }

    if (!album) {
      return callback(Boom.notFound('Album not found.'));
    }

    return PhotoService.getPhoto(photoId, getPhotoComplete);
  };

  return findAlbumById(albumId, getAlbumComplete);
};

exports.addPhotoToAlbum = function(albumId, photo, callback) {
  const findAlbumComplete = function(err, album) {
    if (err) {
      return callback(err);
    }

    return callback(null, album);
  };

  const createRelationshipComplete = function(err) {
    if (err) {
      return callback(err);
    }

    return findAlbumById(albumId, findAlbumComplete);
  };

  const createPhotoComplete = function(err, photo) {
    if (err) {
      return callback(err);
    }

    return AlbumsPhotosService.createRelationship(
      albumId,
      photo.id,
      createRelationshipComplete);
  };

  const checkAlbumComplete = function(err, album) {
    if (err) {
      return callback(err);
    }

    if (!album) {
      return callback(Boom.notFound('Album not found.'));
    }

    return PhotoService.createPhoto(photo, createPhotoComplete);
  };

  return findAlbumById(albumId, checkAlbumComplete);
};

exports.removePhotoFromAlbum = function(albumId, photoId, callback) {
  const removeComplete = function(err) {
    return callback(err);
  };

  return AlbumsPhotosService.removePhotoFromAlbum(
    albumId,
    photoId,
    removeComplete);
};
