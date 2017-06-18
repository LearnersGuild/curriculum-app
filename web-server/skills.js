const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../database/queries')
const commands = require('../database/commands')

module.exports = app => {

  app.get('/skills', (request, response, next) => {
    const user_id = request.user.id
    queries.getChecks({user_id})
      .then(checks => {
        response.render('skills/index', {
          checks,
        })
      })
      .catch(next)
  })

  app.get('/skills/:skillId', (request, response, next) => {
    const skillId = request.params.skillId
    const skill = response.digest.skills[skillId]
    if (!skill) return response.renderNotFound()

    const user_id = request.user.id
    const labels = [skill.name]
    queries.getChecks({user_id, labels})
      .then(checks => {
        const checked = skill.name in checks ? checks[skill.name] : false
        response.render('skills/show', {skill, checked})
      })
      .catch(next)
  })

}
