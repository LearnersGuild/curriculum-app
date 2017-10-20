module.exports = app => {

  app.get('/modules', app.ensureTrailingSlash, (request, response, next) => {
    response.renderMarkdownFile(`/modules/README.md`)
  })

  app.get('/modules/:moduleId', app.ensureTrailingSlash, (request, response, next) => {
    const userId = request.user.id
    const { digest } = response
    const { moduleId } = request.params
    const currentModule = digest.modules[moduleId]
    if (!currentModule) return response.renderNotFound()
    const skills = currentModule.skills.map(skillId => digest.skills[skillId])
    request.loadCheckedForSkills(userId, skills)
      .then(skills => {
        response.renderMarkdownFile(`/modules/${moduleId}/README.md`, {
          currentModule,
          moduleId,
          skills,
        })
      })
      .catch(next)
  })

  app.get('/modules/:moduleId/*', (request, response, next) => {
    response.renderFile(request.path)
  })

}
