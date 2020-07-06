'use strict';

var _artistController = require('../controllers/artistController');

var _artistController2 = _interopRequireDefault(_artistController);

var _songController = require('../controllers/songController');

var _songController2 = _interopRequireDefault(_songController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function routes(app) {
  app.get('/artists', function (req, res) {
    return _artistController2.default.getArtists(res);
  });

  app.get('/artist/:artistName', function (req, res) {
    return _artistController2.default.getArtistByName(req.params.artistName, res);
  });

  app.get('/artist/:artistName/albums', function (req, res) {
    return _artistController2.default.getArtistAlbums(req.params.artistName, 5, res);
  });

  app.get('/songs', function (req, res) {
    return _songController2.default.getAllSongs(res);
  });

  app.get('/song/:songName', function (req, res) {
    return _songController2.default.getAllSongsWithSimilarName(req.params.songName, 10, res);
  });

  app.get('/song/:songName/artist/:artistName', function (req, res) {
    return _songController2.default.getSongByNameAndArtist(req.params.songName, req.params.artistName, res);
  });
};