import lastfmClient from '../api/lastfmClient';

module.exports = function routes(app) {
  app.get('/artists', (req, res) => {
    lastfmClient().artistList({ user: 'jtinoco22', limit: 20 })
    .then((response) => {
      const jsonResponse = response.artists.artist.map((a) => {
        const newArtist = {
          artist: a.name,
          images: a.image,
        };
        return newArtist;
      });
      return res.json(jsonResponse);
    });
  });

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

  app.get('/artist/:artistName/albums', (req, res) => {
    lastfmClient().artistGetTopAlbums({ artist: req.params.artistName, limit: 5 })
    .then((response) => {
      const albums = response.topalbums.album;
      const returnJson = albums.map((album) => {
        const newAlbum = {
          album: album.name,
          playcount: album.playcount,
          artist: album.artist.name,
          images: album.image,
        };
        return newAlbum;
      });
      return res.json(returnJson);
    });
  });

  app.get('/songs', (req, res) => {
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
