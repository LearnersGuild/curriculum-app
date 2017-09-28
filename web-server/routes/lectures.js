const fetch = require('node-fetch')
const qs = require('querystring')
const API_KEY = process.env.YOUTUBE_API_KEY
const URL = 'https://www.googleapis.com/youtube/v3/playlistItems'

module.exports = app => {
  app.get('/lectures(/:pageToken)?', (request, response, next) => {
    requestYoutubeVideos(request.params.pageToken)
      .then(videos => {
        response.locals.title = 'Lectures'
        response.locals.videos = videos
        response.locals.nextPageToken = videos.nextPageToken || ''
        response.locals.prevPageToken = videos.prevPageToken || ''
        response.render('lectures')
      })
      .catch(next)
  })
}

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

const requestYoutubeVideos = pageToken =>
  fetch(generateApiUrl(pageToken))
    .then(response => response.json())
    .then(response => {
      if (response.error)
        throw new Error(`Unable to request videos from youtube: ${response.error.message}`)
      const videos = response.items.map(video => video.snippet)
      videos.nextPageToken = response.nextPageToken
      videos.prevPageToken = response.prevPageToken
      return videos
    })
