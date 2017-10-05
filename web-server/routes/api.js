const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../../database/queries')
const commands = require('../../database/commands')

module.exports = app => {

  app.use('/api', bodyParser.json())

  app.post('/api/skills/checked', (request, response, next) => {
    const userId = request.user.id
    const skillIds = request.body.skills
    queries.getCheckedSkills(userId, skillIds)
      .then(checkedSkills => {
        response.json(checkedSkills)
      })
      .catch(next)
  })

  app.post('/api/skills/:skillId/check', (request, response, next) => {
    const userId = request.user.id
    const { skillId } = request.params
    const referrer = request.header('Referer')
    commands.checkSkill(userId, skillId, referrer)
      .then(_ => { response.json({checked: true}) })
      .catch(next)
  })

  app.post('/api/skills/:skillId/uncheck', (request, response, next) => {
    const userId = request.user.id
    const { skillId } = request.params
    const referrer = request.header('Referer')
    commands.uncheckSkill(userId, skillId, referrer)
      .then(_ => { response.json({unchecked: true}) })
      .catch(next)
  })

  // Error Handler
  app.use('/api', (error, req, res, next) => {
    let status = error.code || error.status
    if (typeof status !== 'number') status = 500
    const stack = process.env.NODE_ENV === 'development'
      ? error.stack
      : null
    const json = {
      error: {},
    }
    Object.assign(json.error, error)
    json.error.message = error.message
    json.error.stack = stack
    res.status(status).json(json);
  })

}
