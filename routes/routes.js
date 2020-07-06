import artistController from '../controllers/artistController';
import songController from '../controllers/songController';

module.exports = function routes(app) {
  app.get('/artists', (req, res) => artistController.getArtists(res));

  app.get('/artist/:artistName', (req, res) => artistController.getArtistByName(req.params.artistName, res));

  app.get('/artist/:artistName/albums', (req, res) => artistController.getArtistAlbums(req.params.artistName, 5, res));

  app.get('/songs', (req, res) => songController.getAllSongs(res));

  app.get('/song/:songName', (req, res) => songController.getAllSongsWithSimilarName(req.params.songName, 10, res));

  app.get('/song/:songName/artist/:artistName', (req, res) => songController.getSongByNameAndArtist(req.params.songName, req.params.artistName, res));
};
