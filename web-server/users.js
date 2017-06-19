const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../database/queries')
const commands = require('../database/commands')

module.exports = app => {

  app.use('/users', (request, response, next) => {
    request.getUsers = () =>
      request.queryIdm(`
        query {
          findUsers {
            name
            handle
            avatarUrl
            email
            active
          }
        }
      `)
      .then(results =>
        results.data.findUsers
      )
      .then(users =>
        users.filter(user => user.active)
      )
      .then(users =>
        users.filter(user =>
          !['echo-bot','lg-bot'].includes(user.handle)
        )
      )

    next()
  })

  app.get('/users', (request, response, next) => {
    request.getUsers().then(users => {
      response.render('users/index', { users })
    })
    .catch(next)
  })

  app.get('/users/:handle', (request, response, next) => {
    const { handle } = request.params
    request.getUsers().then(users => {
      const user = users.find(user => user.handle === handle)
      if (!user) return response.renderNotFound()
      response.render('users/show', { user })
    })
    .catch(next)
  })
}
