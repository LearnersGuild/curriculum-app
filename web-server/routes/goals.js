const goalsById = require('../../goals/goals')
const goals = Object.values(goalsById)

module.exports = app => {

  app.use('/api/goals', (request, response, next) => {
    response.setHeader('access-control-allow-origin', '*')
    response.setHeader('Cache-Control', 'public, max-age=600')
    next()
  })

  app.get('/api/goals/index.json', (request, response, next) => {
    response.json({ goals })
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

}
