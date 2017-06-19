const queries = require('../../database/queries')

module.exports = app => {

  app.use('/phases/:phaseNumber', (request, response, next) => {
    const phaseNumber = Number.parseInt(request.params.phaseNumber)
    response.locals.phase = response.phase = response.digest.phases[phaseNumber]
    next()
  })

  app.get('/phases/:phaseNumber/skills', (request, response, next) => {
    const user_id = request.user.id
    const labels = response.phase.skills
    queries.getChecks({user_id, labels})
      .then(checks => {
        response.render('phases/skills', {checks})
      })
      .catch(next)
  })

  app.get('/phases/3/goals', (request, response, next) => {
    response.render('phases/goals')
  })

}
