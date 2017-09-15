const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../../database/queries')
const commands = require('../../database/commands')

module.exports = app => {

  app.get('/users', (request, response, next) => {
    request.backOffice.getAllUsers({
      includePhases: true,
    }).then(users => {
      response.render('users/index', { users, title: 'Users' })
    })
    .catch(next)
  })

  app.get('/users/:handle', (request, response, next) => {
    const { handle } = request.params
    request.backOffice.getUserByHandle(handle, {
      includeHubspotData: true,
    })
    .then(targetUser => {
      if (!targetUser) return response.renderNotFound()
      response.render('users/show', { targetUser, title: handle })
    })
    .catch(next)
  })
}
