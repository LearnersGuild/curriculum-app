const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../database/queries')
const commands = require('../database/commands')

module.exports = app => {

  app.get('/skills', (request, response, next) => {
    response.render('skills')
  })

  app.get('/skills/:skillId', (request, response, next) => {
    const skillId = request.params.skillId
    const skill = response.digest.skills[skillId]

    if (!skill) return response.renderNotFound()
    response.render('skills/show', {
      skill,
    })
  })

}
