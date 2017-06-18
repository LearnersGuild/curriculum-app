const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../database/queries')

module.exports = app => {

  app.use('/api', bodyParser.json())

  app.post('/api/checks/status', (request, response, next) => {
    response.json(request.body)
  })

  app.post('/api/checks', (request, response, next) => {
    response.json({nothing: true})
  })

}
