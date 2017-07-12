const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../../database/queries')
const commands = require('../../database/commands')

module.exports = app => {

  app.get('/users', (request, response, next) => {
    request.backOffice.getActiveLearners().then(users => {
      response.render('users/index', { users })
    })
    .catch(next)
  })

  app.get('/users/:handle', (request, response, next) => {
    const { handle } = request.params
    request.backOffice.getActiveLearners().then(users => {
      const user = users.find(user => user.handle === handle)
      if (!user) return response.renderNotFound()
      response.render('users/show', { user })
    })
    .catch(next)
  })
}
