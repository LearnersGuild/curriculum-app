module.exports = app => {

  app.get('/challenges', app.ensureTrailingSlash, (request, response, next) => {
    response.renderMarkdownFile(`/challenges/README.md`)
  })

  app.get('/challenges/:challengeId', app.ensureTrailingSlash, (request, response, next) => {
    const userId = request.user.id
    const { digest } = response
    const { challengeId } = request.params
    const currentChallenge = digest.challenges[challengeId]
    if (!currentChallenge) return response.renderNotFound()
    const skills = currentChallenge.skills.map(skillId => digest.skills[skillId])
    request.loadCheckedForSkills(userId, skills)
      .then(skills => {
        response.renderMarkdownFile(`/challenges/${challengeId}/README.md`, {
          currentChallenge,
          challengeId,
          skills,
        })
      })
      .catch(next)
  })

  app.get('/challenges/:challengeId/*', (request, response, next) => {
    response.renderFile(request.path)
  })

}
