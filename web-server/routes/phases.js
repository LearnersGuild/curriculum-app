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
        const skills = response.phase.skills.map(skillId =>
          Object.assign({}, response.digest.skills[skillId], {checked: !!checks[skillId]})
        )
        response.render('phases/skills', {skills})
      })
      .catch(next)
  })

  app.get('/phases/3/goals', (request, response, next) => {
    response.render('phases/goals')
  })

}
