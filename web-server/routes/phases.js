const queries = require('../../database/queries')

module.exports = app => {

  app.get('/phases', app.ensureTrailingSlash, (request, response, next) => {
    response.renderMarkdownFile(`/phases/README.md`)
  })


  app.get('/phases/:phaseNumber', app.ensureTrailingSlash)

  app.use('/phases/:phaseNumber', (request, response, next) => {
    const { phaseNumber } = request.params
    response.locals.phase = request.phase = response.digest.phases[phaseNumber]
    next()
  })

  app.get('/phases/:phaseNumber', (request, response, next) => {
    const { phaseNumber } = request.params
    response.renderMarkdownFile(`/phases/${phaseNumber}/README.md`)
  })

  app.get('/phases/:phaseNumber/schedule.md', (request, response, next) => {
    const { phaseNumber } = request.params
    response.redirect(`/phases/${phaseNumber}/schedule`)
  })

  app.get('/phases/:phaseNumber/schedule', (request, response, next) => {
    const { phaseNumber } = request.params
    response.render("phases/schedule", {title: `Phase ${phaseNumber} Schedule`})
  })

  app.get('/phases/:phaseNumber/skills', (request, response, next) => {
    const userId = request.user.id
    const labels = request.phase.skills
    const { phaseNumber } = request.params
    queries.getChecksForUserAndLabels({userId, labels})
      .then(checks => {
        const skills = request.phase.skills.map(skillId =>
          Object.assign({}, response.digest.skills[skillId], {checked: !!checks[skillId]})
        )
        response.render('phases/skills', {skills, title: `Phase ${phaseNumber} Skills`})
      })
      .catch(next)
  })

  app.get('/phases/3/goals', (request, response, next) => {
    response.render('phases/goals', {title: 'Phase 3 Goals'})
  })

  app.use('/phases/:phaseNumber/dashboard', app.ensureAdmin)

  app.get('/phases/:phaseNumber/dashboard', (request, response, next) => {
    const { phaseNumber } = request.params
    response.render('phases/dashboard/index',  {title: `Phase ${phaseNumber} Dashboard`})
  })

  app.get('/phases/:phaseNumber/dashboard/progress', (request, response, next) => {
    const { phase } = request
    const { phaseNumber } = request.params
    request.getUsersForPhaseWithCheckLog(phase.number)
      .then(learners => {
        learners.forEach(learner => {
          learner.skillsDenominator = phase.skills.length
          learner.skillsNumerator = learner.checkedSkills.filter(skill => phase.skills.includes(skill)).length
        })
        learners.sort((a,b)=>
          b.skillsNumerator - a.skillsNumerator
        )
        response.render('phases/dashboard/progress', {learners, title: `Phase ${phaseNumber} Progress`})
      })
      .catch(next)
  })

  app.get('/phases/:phaseNumber/dashboard/learners', (request, response, next) => {
    const { phaseNumber } = request.params
    request.backOffice.getAllLearners({
      phase: request.phase.number,
      includeHubspotData: true,
    })
      .then(learners => {
        learners = learners.sort((a, b) => {
          a = a[`phase${request.phase.number}StartDate`] || 0
          b = b[`phase${request.phase.number}StartDate`] || 0
          return a < b ? 1 : a > b ? -1 : 0
        })
        response.render('phases/dashboard/learners/index', {learners, title: `Phase ${phaseNumber} Learners`})
      })
      .catch(next)
  })

  app.get('/phases/:phaseNumber/dashboard/learners/:learnerHandle', (request, response, next) => {
    const { learnerHandle } = request.params

    request.getUserWithCheckLog(learnerHandle)
      .then(learner => {
        response.render('phases/dashboard/learners/show', {learner, title: learnerHandle})
      })
      .catch(next)
  })

  app.get('/phases/:phaseNumber/dashboard/learners/:learnerHandle/skills', (request, response, next) => {
    const { learnerHandle } = request.params

    request.getUserWithCheckLog(learnerHandle)
      .then(learner => {
        response.render('phases/dashboard/learners/skills', {learner, title: `${learnerHandle} Skills`})
      })
      .catch(next)
  })

  app.get('/phases/:phaseNumber/dashboard/learners/:learnerHandle/check-log', (request, response, next) => {
    const { learnerHandle } = request.params

    request.getUserWithCheckLog(learnerHandle)
      .then(learner => {
        response.render('phases/dashboard/learners/check-log', {learner, title: `${learnerHandle} Check Log`})
      })
      .catch(next)
  })

  app.get('/phases/:phaseNumber/*', (request, response, next) => {
    response.renderFile(request.path)
  })
}
