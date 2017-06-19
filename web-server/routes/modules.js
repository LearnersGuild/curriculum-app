const queries = require('../../database/queries')

module.exports = app => {

  app.use('/modules/:moduleName', (request, response, next) => {
    const user_id = request.user.id
    const { moduleName } = request.params
    const { digest } = response
    const { renderSkill } = app.locals
    const currentModule = digest.modules[moduleName]
    const currentModuleSkills = currentModule.skills
      .map(id => {
        const skill = digest.skills[id]
        const html = renderSkill(skill)
        return {id, html, path: skill.path}
      })

    response.locals.moduleName = moduleName
    response.locals.currentModule = currentModule
    response.locals.currentModuleSkills = currentModuleSkills

    const labels = currentModuleSkills.map(skill => skill.id)
    queries.getChecks({user_id, labels})
      .then(checks => {
        currentModuleSkills.forEach(skill => {
          skill.checked = !!checks[skill.id]
        })
        next()
      })
      .catch(next)
  })

  app.get(/.*$/, (request, response, next) => {
    const path = request.path
    if (!/(\/|\.md)$/.test(path)){
      response.redirect(path+'/')
    }else{
      response.renderMarkdownFile()
    }
  })

}
