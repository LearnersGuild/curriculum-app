const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../../database/queries')
const commands = require('../../database/commands')

module.exports = app => {

  app.get('/skills', (request, response, next) => {
    const userId = request.user.id

    queries.getChecksForUserAndLabels({userId})
      .then(checks => {
        const skills = Object.keys(response.digest.skills).map(skillId =>
          Object.assign({}, response.digest.skills[skillId], {checked: !!checks[skillId]})
        )
        response.render('skills/index', {
          skills,
          title: 'All Skills'
        })
      })
      .catch(next)
  })

  app.get('/skills/:skillId', (request, response, next) => {
    const skillId = request.params.skillId
    const skill = response.digest.skills[skillId]
    if (!skill) return response.renderNotFound()

    const userId = request.user.id
    const labels = [skill.id]
    queries.getChecksForUserAndLabels({userId, labels})
      .then(checks => {
        const checked = !!checks[skill.id]
        response.render('skills/show', {skill, checked, title: skill.name})
      })
      .catch(next)
  })

}
