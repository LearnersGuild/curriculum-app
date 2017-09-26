const fetch = require('node-fetch')
const qs = require('querystring')
const API_KEY = process.env.YOUTUBE_API_KEY
const URL = 'https://www.googleapis.com/youtube/v3/playlistItems'

const generateApiUrl = function(pageToken) {
  const query = qs.stringify({
    part: 'snippet',
    maxResults: '48',
    playlistId: 'UU599lkzf-2haPTzDAMGEgLg',
    key: API_KEY,
    pageToken,
  })
  return `${URL}?${query}`
}

module.exports = app => {
  app.get('/lectures(/:pageToken)?', (request, response, next) => {
    const { pageToken } = request.params
    const url = generateApiUrl(pageToken)
    fetch(url)
      .then(function(res) {
          return res.json();
      }).then(function(json) {
          app.locals.nextPageToken = json.nextPageToken || ''
          app.locals.prevPageToken = json.prevPageToken || ''
          const videos = json.items.map(video => video.snippet)
          response.render('lectures', { title: 'Lectures', videos })
      })
      .catch(next)
  })
}