'use strict';

var _lastfmClient = require('../api/lastfmClient');

var _lastfmClient2 = _interopRequireDefault(_lastfmClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  getAllSongs: function getAllSongs(res) {
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
  },

  getAllSongsWithSimilarName: function getAllSongsWithSimilarName(songName, limit, res) {
    (0, _lastfmClient2.default)().trackSearch({ track: songName, limit: limit }).then(function (response) {
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
  },

  getSongByNameAndArtist: function getSongByNameAndArtist(songName, artistName, res) {
    (0, _lastfmClient2.default)().trackGetInfo({ track: songName, artist: artistName }).then(function (response) {
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
  }
};