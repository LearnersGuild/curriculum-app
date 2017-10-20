const queries = require('../../database/queries')

module.exports = app => {

  app.get('/modules', app.ensureTrailingSlash, (request, response, next) => {
    response.renderMarkdownFile(`/modules/README.md`)
  })

  app.get('/modules/:moduleName', app.ensureTrailingSlash)

  app.use('/modules/:moduleName', (request, response, next) => {
    const userId = request.user.id
    const { moduleName } = request.params
    const { digest } = response
    const { renderSkill } = app.locals
    const currentModule = digest.modules[moduleName]
    if (!currentModule) return next()
    response.locals.moduleName = moduleName
    response.locals.currentModule = currentModule

    const currentModuleSkills = currentModule.skills
      .map(id => {
        const skill = digest.skills[id]
        const html = renderSkill(skill)
        return {id, html, path: skill.path}
      })

    request.loadCheckedForSkills(userId, currentModuleSkills)
      .then(currentModuleSkills => {
        response.locals.currentModuleSkills = currentModuleSkills
        next()
      })
      .catch(next)
  })

  app.get('/modules/:moduleName', (request, response, next) => {
    const { moduleName } = request.params
    response.renderMarkdownFile(`/modules/${moduleName}/README.md`)
  })

  app.get('/modules/:moduleName/*', (request, response, next) => {
    response.renderFile(request.path)
  })

}
