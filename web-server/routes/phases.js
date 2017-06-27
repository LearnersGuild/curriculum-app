const queries = require('../../database/queries')

module.exports = app => {

  app.get('/phases', app.ensureTrailingSlash, (request, response, next) => {
    response.renderMarkdownFile(`/phases/README.md`)
  })


  app.get('/phases/:phaseNumber', app.ensureTrailingSlash)

  app.use('/phases/:phaseNumber', (request, response, next) => {
    const { phaseNumber } = request.params
    response.locals.phase = response.phase = response.digest.phases[phaseNumber]
    next()
  })

  app.get('/phases/:phaseNumber', (request, response, next) => {
    const { phaseNumber } = request.params
    response.renderMarkdownFile(`/phases/${phaseNumber}/README.md`)
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

  app.get('/phases/:phaseNumber/*', (request, response, next) => {
    response.renderFile(request.path)
  })
}
