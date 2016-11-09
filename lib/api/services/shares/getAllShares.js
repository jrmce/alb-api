module.exports = function(userId, callback) {

  const sql = `
    SELECT
      shares.id,
      shares.token,
      shares.expired_at as "expiredAt",
      shares.created_at as "createdAt",
      shares.updated_at as "updatedAt",
      shares_albums.album_id as "albums",
      shares_photos.photo_id as "photos",
    FROM shares
    JOIN shares_albums
    ON shares.id = shares_albums.share_id
    JOIN shares_photos
    ON shares.id = shares_photos.share_id
  `;
}