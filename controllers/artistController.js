import lastfmClient from '../api/lastfmClient';

module.exports = {
  getArtists: (res) => {
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
  },

  getArtistByName: (artistName, res) => {
    lastfmClient().artistGetInfo({ artist: artistName })
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
  },

  getArtistAlbums: (artistName, limit, res) => {
    lastfmClient().artistGetTopAlbums({ artist: artistName, limit })
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
  },
};
