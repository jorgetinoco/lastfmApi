'use strict';

var _lastfmClient = require('../api/lastfmClient');

var _lastfmClient2 = _interopRequireDefault(_lastfmClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  getArtists: function getArtists(res) {
    (0, _lastfmClient2.default)().artistList({ user: 'jtinoco22', limit: 20 }).then(function (response) {
      var jsonResponse = response.artists.artist.map(function (a) {
        var newArtist = {
          artist: a.name,
          images: a.image
        };
        return newArtist;
      });
      return res.json(jsonResponse);
    });
  },

  getArtistByName: function getArtistByName(artistName, res) {
    (0, _lastfmClient2.default)().artistGetInfo({ artist: artistName }).then(function (response) {
      if (response.error) {
        return res.json(response);
      }
      var artist = {};
      var returnJson = {};
      var responseArtist = response.artist;
      artist.name = responseArtist.name;
      artist.url = responseArtist.url;
      artist.image = responseArtist.image.find(function (img) {
        return img.size === 'large';
      })['#text'] || '';
      artist.onTour = responseArtist.ontour;
      artist.similarArtist = responseArtist.similar.artist.map(function (simArtist) {
        return simArtist.name;
      });
      artist.tags = responseArtist.tags.tag.map(function (tag) {
        return tag.name;
      });
      artist.bio = responseArtist.bio ? responseArtist.bio.summary : '';
      returnJson.artist = artist;
      return res.json(returnJson);
    });
  },

  getArtistAlbums: function getArtistAlbums(artistName, limit, res) {
    (0, _lastfmClient2.default)().artistGetTopAlbums({ artist: artistName, limit: limit }).then(function (response) {
      var albums = response.topalbums.album;
      var returnJson = albums.map(function (album) {
        var newAlbum = {
          album: album.name,
          playcount: album.playcount,
          artist: album.artist.name,
          images: album.image
        };
        return newAlbum;
      });
      return res.json(returnJson);
    });
  }
};