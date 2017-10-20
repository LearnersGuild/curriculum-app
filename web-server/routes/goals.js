const goalsById = require('../../goals/goals')
const goals = Object.values(goalsById)



module.exports = app => {

  app.use('/api/goals', (request, response, next) => {
    response.setHeader('access-control-allow-origin', '*')
    response.setHeader('Cache-Control', 'public, max-age=600')
    next()
  })

  app.get('/api/goals/index.json', (request, response, next) => {
    const goalsWithUrl = goals.map(goal =>
      goalToGoalWithURL(request, goal)
    )
    response.json({ goals: goalsWithUrl })
  })

  app.get('/api/goals/:goalId.json', (request, response, next) => {
    const goalId = request.params.goalId
    const goal = goalsById[goalId]
    if (goal) {
      response.json(goalToGoalWithURL(request, goal))
    } else {
      response.status(404).json({error: `Could not find goal with id: ${goalId}`})
    }
  })

}

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
const goalToGoalWithURL = (request, _goal) => {
  const goal = Object.assign({}, _goal)
  goal.url = `${protocol}://${request.get('host')}${goal.path}`
  delete goal.path
  return goal
}
