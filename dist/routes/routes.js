'use strict';

var _lastfmClient = require('../api/lastfmClient');

var _lastfmClient2 = _interopRequireDefault(_lastfmClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function routes(app) {
  app.get('/artists', function (req, res) {
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
  });

  app.get('/artist/:artistName', function (req, res) {
    (0, _lastfmClient2.default)().artistGetInfo({ artist: req.params.artistName }).then(function (response) {
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
  });

  app.get('/artist/:artistName/albums', function (req, res) {
    (0, _lastfmClient2.default)().artistGetTopAlbums({ artist: req.params.artistName, limit: 5 }).then(function (response) {
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
  });

  app.get('/songs', function (req, res) {
    (0, _lastfmClient2.default)().userGetTopTracks({ user: 'jtinoco22', period: 'overall' }).then(function (json) {
      var response = json.toptracks.track;
      var tracks = response.map(function (track) {
        var newTrack = {};
        newTrack.name = track.name;
        newTrack.playcount = track.playcount;
        newTrack.url = track.url;
        newTrack.artist = track.artist.name;
        newTrack.image = track.image;
        return newTrack;
      });
      res.send({ tracks: tracks });
    });
  });

  app.get('/song/:songName', function (req, res) {
    (0, _lastfmClient2.default)().trackSearch({ track: req.params.songName, limit: 10 }).then(function (response) {
      if (response.error) {
        return res.json(response);
      }
      var returnJson = {};
      returnJson.tracks = [];
      response.results.trackmatches.track.forEach(function (element) {
        var track = {};
        track.name = element.name;
        track.artist = element.artist;
        track.url = element.url;
        track.listeners = element.listeners;
        track.image = element.image.find(function (x) {
          return x.size === 'large';
        })['#text'] || '';
        returnJson.tracks.push(track);
      });
      return res.json(returnJson);
    });
  });

  app.get('/song/:songName/artist/:artistName', function (req, res) {
    // track.getinfo
    (0, _lastfmClient2.default)().trackGetInfo({ track: req.params.songName, artist: req.params.artistName }).then(function (response) {
      if (response.error) {
        return res.json(response);
      }
      var returnJson = {};
      var track = {};
      var jsonResponseTrack = response.track;
      track.name = jsonResponseTrack.name;
      track.url = jsonResponseTrack.url;
      track.duration = jsonResponseTrack.duration / 1000 / 60;
      track.listeners = jsonResponseTrack.listeners;
      delete jsonResponseTrack.artist.mbid;
      track.artist = jsonResponseTrack.artist;
      track.tags = jsonResponseTrack.toptags.tag.map(function (tag) {
        return tag.name;
      });
      track.wiki = jsonResponseTrack.wiki || {};
      returnJson.track = track;
      return res.json(returnJson);
    });
  });
};