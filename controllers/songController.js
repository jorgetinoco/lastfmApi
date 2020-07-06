import lastfmClient from '../api/lastfmClient';

module.exports = {
  getAllSongs: (res) => {
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
  },

  getAllSongsWithSimilarName: (songName, limit, res) => {
    lastfmClient().trackSearch({ track: songName, limit })
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
  },

  getSongByNameAndArtist: (songName, artistName, res) => {
    lastfmClient().trackGetInfo({ track: songName, artist: artistName })
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
  },
};
