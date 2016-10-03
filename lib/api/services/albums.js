const Db = require('../db');
const PhotoService = require('./photos');
const AlbumsPhotosService = require('./albumsPhotos');

// Private functions

const findAlbumById = function(id, callback) {
  const sql = `
    SELECT id, title, cover_photo_id as "coverPhotoId"
    FROM albums
    WHERE id = $1
  `;

  const findAlbumComplete = function(err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res.rows[0]);
  };

  return Db.query(sql, [ id ], findAlbumComplete);
};

const findAllPhotosByAlbumId = function(id) {
  const sql = `
    SELECT photos.id
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

    return callback(null, res);
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
    SET title = $1
    WHERE id = $2
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

  return Db.query(sql, [ album.title, id ], updateComplete);
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

  const createPhotoComplete = function(err, photoId) {
    if (err) {
      return callback(err);
    }

    return AlbumsPhotosService.createRelationship(
      albumId,
      photoId,
      createRelationshipComplete);
  };

  return PhotoService.createPhoto(photo, createPhotoComplete);
};

exports.removePhotoFromAlbum = function(albumId, photoId) {
  const sql = `
    DELETE FROM albums_photos
    WHERE album_id = $1
    AND photo_id = $2
  `;

  const removePhotoComplete = function(err) {
    return callback(err);
  };

  return Db.query(sql, [ albumId, photoId ], removePhotoComplete);
};
