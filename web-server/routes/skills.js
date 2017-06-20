const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../../database/queries')
const commands = require('../../database/commands')

module.exports = app => {

  app.get('/skills', (request, response, next) => {
    const user_id = request.user.id


    queries.getChecks({user_id})
      .then(checks => {
        const skills = Object.keys(response.digest.skills).map(skillId =>
          Object.assign({}, response.digest.skills[skillId], {checked: !!checks[skillId]})
        )
        response.render('skills/index', {
          skills
        })
      })
      .catch(next)
  })

  app.get('/skills/:skillId', (request, response, next) => {
    const skillId = request.params.skillId
    const skill = response.digest.skills[skillId]
    if (!skill) return response.renderNotFound()

    const user_id = request.user.id
    const labels = [skill.id]
    queries.getChecks({user_id, labels})
      .then(checks => {
        const checked = !!checks[skill.id]
        response.render('skills/show', {skill, checked})
      })
      .catch(next)
  })

}
