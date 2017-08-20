'use strict';

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lastfmClient() {
  var LASTFM_KEY = process.env.LASTFM_KEY;

  var apiUrl = 'https://ws.audioscrobbler.com/2.0/?format=json&method=';
  var enc = encodeURIComponent;

  var apiMap = {
    track: {
      getInfo: 'track.getinfo&', // artist, track, username, autocorrect, api_key
      search: 'track.search&' //artist, track, limit, page, api_key
    },
    user: {
      getTopTracks: 'user.gettoptracks&' // user, period, limit, page, key
    },
    artist: {
      getInfo: 'artist.getinfo&' // artist, mbid, lang, autocorrect, username, key
    }
  };

  function getParams(params) {
    var paramsWithApiKey = params;
    paramsWithApiKey.api_key = LASTFM_KEY;
    var queryString = Object.keys(paramsWithApiKey || {}).map(function (key) {
      return key + '=' + enc(paramsWithApiKey[key]);
    }).join('&');
    return queryString;
  }

  function getURI(params, to, method) {
    var methodString = apiMap[to][method];
    var queryParams = getParams(params);
    var uri = '' + apiUrl + methodString + queryParams;
    return uri;
  }

  function callURI(params, to, method) {
    var uri = getURI(params, to, method);
    // console.log('uri: ', uri);
    return (0, _axios2.default)({
      url: uri,
      method: 'get',
      headers: {
        'User-Agent': 'interview.lastfm.api/v1 (restful api for lastfm)'
      }
    }).then(function (response) {
      return Promise.resolve(response.data);
    });
  }

  function trackGetInfo(params) {
    var autoCorrectParams = params;
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
    var autoCorrectParams = params;
    autoCorrectParams.autocorrect = 1;
    return callURI(autoCorrectParams, 'artist', 'getInfo');
  }

  return {
    trackGetInfo: trackGetInfo,
    trackSearch: trackSearch,
    userGetTopTracks: userGetTopTracks,
    artistGetInfo: artistGetInfo
  };
}

module.exports = lastfmClient;