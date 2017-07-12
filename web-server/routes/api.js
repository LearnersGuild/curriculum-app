const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../../database/queries')
const commands = require('../../database/commands')
const goalsById = require('../../goals/goals')

module.exports = app => {

  app.use('/api', bodyParser.json())

  app.post('/api/checks/status', (request, response, next) => {
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

  app.post('/api/checks/set', (request, response, next) => {
    const user_id = request.user.id
    const { label, checked } = request.body
    const referrer = request.header('Referer');
    commands.setCheck({user_id, label, checked, referrer})
      .then(_ => {
        response.json({saved: true})
      })
      .catch(next)
  })

  app.get('/api/goals/index.json', (request, response, next) => {
    response.json({goals: Object.keys(goalsById).map( goalId => goalsById[goalId])})
  })

  app.get('/api/goals/:id.json', (request, response, next) => {
    const id = request.params.id
    const goal = goalsById[id]
    if (goal) {
      response.json(goal)
    } else {
      response.status(404).json({error: `Could not find goal with id: ${id}`})
    }
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
