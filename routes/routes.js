import lastfmClient from '../api/lastfmClient';

module.exports = function routes(app) {
  /**
   * @swagger
   *  /artist/{artistName}:
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
   *                    type: array
   *                    items:
   *                      type: string
   *                  tags:
   *                    type: array
   *                    items:
   *                      type: string
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
  app.get('/artist/:artistName', (req, res) => {
    lastfmClient().artistGetInfo({ artist: req.params.artistName })
    .then((response) => {
      if (response.error) {
        return res.json(response);
      }
      const artist = {};
      const returnJson = {};
      const responseArtist = response.artist;
      artist.name = responseArtist.name;
      artist.url = responseArtist.url;
      artist.image = responseArtist.image.find(img => img.size === 'large')['#text'] || '';
      artist.onTour = responseArtist.ontour;
      artist.similarArtist = responseArtist.similar.artist.map(simArtist => simArtist.name);
      artist.tags = responseArtist.tags.tag.map(tag => tag.name);
      artist.bio = responseArtist.bio ? responseArtist.bio.summary : '';
      returnJson.artist = artist;
      return res.json(returnJson);
    });
  });

  /**
   * @swagger
   *  /song:
   *    get:
   *      tags:
   *        - Song
   *      description: Returns the top 50 songs
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: List of top 50 songs
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
   *                    playcount:
   *                      type: string
   *                    artist:
   *                      type: string
   *                    image:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          text:
   *                            type: string
   *                          size:
   *                            type: string
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
  app.get('/song', (req, res) => {
    lastfmClient().userGetTopTracks({ user: 'jtinoco22', period: 'overall' })
    .then((json) => {
      const response = json.toptracks.track;
      const tracks = response.map((track) => {
        const newTrack = {};
        newTrack.name = track.name;
        newTrack.playcount = track.playcount;
        newTrack.url = track.url;
        newTrack.artist = track.artist.name;
        newTrack.image = track.image;
        return newTrack;
      });
      res.send({ tracks });
    });
  });

  /**
   * @swagger
   *  /song/{songName}:
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
  app.get('/song/:songName', (req, res) => {
    lastfmClient().trackSearch({ track: req.params.songName, limit: 10 })
    .then((response) => {
      if (response.error) {
        return res.json(response);
      }
      const returnJson = {};
      returnJson.tracks = [];
      response.results.trackmatches.track.forEach((element) => {
        const track = {};
        track.name = element.name;
        track.artist = element.artist;
        track.url = element.url;
        track.listeners = element.listeners;
        track.image = element.image.find(x => x.size === 'large')['#text'] || '';
        returnJson.tracks.push(track);
      });
      return res.json(returnJson);
    });
  });

  /**
   * @swagger
   *  /song/{songName}/Artist/{artistName}:
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
   *                    type: array
   *                    items:
   *                      type: string
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
  app.get('/song/:songName/artist/:artistName', (req, res) => {
    // track.getinfo
    lastfmClient().trackGetInfo({ track: req.params.songName, artist: req.params.artistName })
    .then((response) => {
      if (response.error) {
        return res.json(response);
      }
      const returnJson = {};
      const track = {};
      const jsonResponseTrack = response.track;
      track.name = jsonResponseTrack.name;
      track.url = jsonResponseTrack.url;
      track.duration = jsonResponseTrack.duration / 1000 / 60;
      track.listeners = jsonResponseTrack.listeners;
      delete jsonResponseTrack.artist.mbid;
      track.artist = jsonResponseTrack.artist;
      track.tags = jsonResponseTrack.toptags.tag.map(tag => tag.name);
      track.wiki = jsonResponseTrack.wiki || {};
      returnJson.track = track;
      return res.json(returnJson);
    });
  });
};
