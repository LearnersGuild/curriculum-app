const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../../database/queries')
const commands = require('../../database/commands')

module.exports = app => {

  app.use('/api', bodyParser.json())

  app.post('/api/skill-checks/status', (request, response, next) => {
    const userId = request.user.id
    const { labels } = request.body
    queries.getChecksForUserAndLabels({userId, labels})
      .then(checks => {
        const map = {}
        labels.forEach(label => {
          map[label] = !!checks[label]
        })
        response.json(map)
      })
      .catch(next)
  })

  app.post('/api/skill-checks/set', (request, response, next) => {
    const user_id = request.user.id
    const { label, checked } = request.body
    const referrer = request.header('Referer');
    commands.setSkillCheck({user_id, label, checked, referrer})
      .then(_ => {
        response.json({saved: true})
      })
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
