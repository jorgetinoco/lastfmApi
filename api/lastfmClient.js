import axios from 'axios';

function lastfmClient() {
  const { LASTFM_KEY } = process.env;
  const apiUrl = 'https://ws.audioscrobbler.com/2.0/?format=json&method=';
  const enc = encodeURIComponent;

  const apiMap = {
    track: {
      getInfo: 'track.getinfo&', // artist, track, username, autocorrect, api_key
      search: 'track.search&', //artist, track, limit, page, api_key
    },
    user: {
      getTopTracks: 'user.gettoptracks&', // user, period, limit, page, key
    },
    artist: {
      getInfo: 'artist.getinfo&', // artist, mbid, lang, autocorrect, username, key
      topAlbums: 'artist.gettopalbums&', // artist, key
    },
    library: {
      getArtists: 'library.getartists&',
    },
  };

  function getParams(params) {
    const paramsWithApiKey = params;
    paramsWithApiKey.api_key = LASTFM_KEY;
    const queryString = Object.keys(paramsWithApiKey || {})
      .map(key => `${key}=${enc(paramsWithApiKey[key])}`).join('&');
    return queryString;
  }

  function getURI(params, to, method) {
    const methodString = apiMap[to][method];
    const queryParams = getParams(params);
    const uri = `${apiUrl}${methodString}${queryParams}`;
    return uri;
  }

  function callURI(params, to, method) {
    const uri = getURI(params, to, method);
    // console.log('uri: ', uri);
    return axios({
      url: uri,
      method: 'get',
      headers: {
        'User-Agent': 'interview.lastfm.api/v1 (restful api for lastfm)',
      },
    }).then(response => Promise.resolve(response.data));
  }

  function trackGetInfo(params) {
    const autoCorrectParams = params;
    autoCorrectParams.autocorrect = 1;
    return callURI(autoCorrectParams, 'track', 'getInfo');
  }

  function trackSearch(params) {
    return callURI(params, 'track', 'search');
  }

  function userGetTopTracks(params) {
    return callURI(params, 'user', 'getTopTracks');
  }

  function artistGetInfo(params) {
    const autoCorrectParams = params;
    autoCorrectParams.autocorrect = 1;
    return callURI(autoCorrectParams, 'artist', 'getInfo');
  }

  function artistGetTopAlbums(params) {
    const autoCorrectParams = params;
    autoCorrectParams.autocorrect = 1;
    return callURI(autoCorrectParams, 'artist', 'topAlbums');
  }

  function artistList(params) {
    return callURI(params, 'library', 'getArtists');
  }

  return {
    trackGetInfo,
    trackSearch,
    userGetTopTracks,
    artistGetInfo,
    artistGetTopAlbums,
    artistList,
  };
}

module.exports = lastfmClient;
