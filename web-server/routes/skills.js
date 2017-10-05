const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../../database/queries')
const commands = require('../../database/commands')

module.exports = app => {

  app.get('/skills', (request, response, next) => {
    const userId = request.user.id

    queries.loadCheckedForSkills(userId)
      .then(skills => {
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

    request.loadCheckedForSkills(userId, [skill])
      .then(([skill]) => {
        response.render('skills/show', {skill, title: skill.name})
      })
      .catch(next)
  })

}
