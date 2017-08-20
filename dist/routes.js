'use strict';

var _lastfmClient = require('../api/lastfmClient');

var _lastfmClient2 = _interopRequireDefault(_lastfmClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function routes(app) {
  app.get('/LastSongs', function (req, res) {
    (0, _lastfmClient2.default)().userGetTopTracks({ user: 'jtinoco22', period: 'overall' }).then(function (json) {
      res.send({ tracks: json.toptracks.track });
    });
  });

  /**
   * @swagger
   *  /Artist/{artistName}:
   *    parameters:
   *      - artistName:
   *        name: artistName
   *        description: artist name to search
   *        in: path
   *        required: true
   *        type: string
   *    get:
   *      tags:
   *        - Artist
   *      description: Return artist matching name
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Artist matching param
   *          schema:
   *            type: object
   *            properties:
   *              artist:
   *                type: object
   *                properties:
   *                  name:
   *                    type: string
   *                  url:
   *                    type: string
   *                  image:
   *                    type: string
   *                  onTour:
   *                    type: string
   *                  similarArtist:
   *                    type: string
   *                  tags:
   *                    type: string
   *                  bio:
   *                    type: string
   *        default:
   *          description: Unexpected error
   *          schema:
   *            type: object
   *            properties:
   *              error:
   *                type: string
   *              message:
   *                type: string
   *              links:
   *                type: array
   *                items:
   *                  type: string
   */
  app.get('/Artist/:artistName', function (req, res) {
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
      }).join(' ,');
      artist.tags = responseArtist.tags.tag.map(function (tag) {
        return tag.name;
      }).join(', ');
      artist.bio = responseArtist.bio ? responseArtist.bio.summary : '';
      returnJson.artist = artist;
      return res.json(returnJson);
    });
  });

  /**
   * @swagger
   *  /Song/{songName}:
   *    parameters:
   *      - songName:
   *        name: songName
   *        description: song name to search
   *        in: path
   *        required: true
   *        type: string
   *    get:
   *      tags:
   *        - Song
   *      description: Return max 10 songs matching the param name
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Songs matching param name
   *          schema:
   *            type: object
   *            properties:
   *              track:
   *                type: array
   *                items:
   *                  type: object
   *                  properties:
   *                    name:
   *                      type: string
   *                    artist:
   *                      type: string
   *                    url:
   *                      type: string
   *                    listeners:
   *                      type: string
   *                    image:
   *                      type: string
   *        default:
   *          description: Unexpected error
   *          schema:
   *            type: object
   *            properties:
   *              error:
   *                type: string
   *              message:
   *                type: string
   *              links:
   *                type: array
   *                items:
   *                  type: string
   */
  app.get('/Song/:songName', function (req, res) {
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

  /**
   * @swagger
   *  /Song/{songName}/Artist/{artistName}:
   *    parameters:
   *      - songName:
   *        name: songName
   *        description: song name to search
   *        in: path
   *        required: true
   *        type: string
   *      - artistName:
   *        name: artistName
   *        description: artist name to search
   *        in: path
   *        required: true
   *        type: string
   *    get:
   *      tags:
   *        - Song
   *      description: Return song matching song name and artist name
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: Song matching params
   *          schema:
   *            type: object
   *            properties:
   *              track:
   *                type: object
   *                properties:
   *                  name:
   *                    type: string
   *                  url:
   *                    type: string
   *                  duration:
   *                    type: number
   *                  listeners:
   *                    type: string
   *                  artist:
   *                    type: object
   *                    properties:
   *                      name:
   *                        type: string
   *                      url:
   *                        type: string
   *                  tags:
   *                    type: string
   *                  wiki:
   *                    type: object
   *                    properties:
   *                      published:
   *                        type: string
   *                      summary:
   *                        type: string
   *                      content:
   *                        type: string
   *        default:
   *          description: Unexpected error
   *          schema:
   *            type: object
   *            properties:
   *              error:
   *                type: string
   *              message:
   *                type: string
   *              links:
   *                type: array
   *                items:
   *                  type: string
   */
  app.get('/Song/:songName/Artist/:artistName', function (req, res) {
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
      }).join(', ');
      track.wiki = jsonResponseTrack.wiki || {};
      returnJson.track = track;
      return res.json(returnJson);
    });
  });
};