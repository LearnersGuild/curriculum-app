const CSVStringify = require('csv-stringify')
const loadDigest = require('../../digest')

module.exports = app => {

  app.use('/backoffice', app.ensureAdmin)

  app.get('/backoffice', (request, response, next) => {
    response.render('backoffice/index')
  })


  app.use('/backoffice/users(.*)?', (request, response, next) => {
    request.backOffice.getAllUsers({
      active: undefined,
      includePhases: true,
      includeHubspotData: true,
    }).then(users => {
      response.users = users
      next()
    })
    .catch(error => {
      response.status(500).send(error.message)
    })
  })

  app.get('/backoffice/users', (request, response, next) => {
    const {users} = response
    response.render('backoffice/users/index', {users})
  })

  app.get('/backoffice/users.json', (request, response, next) => {
    const {users} = response
    response.json({users})
  })

  app.get('/backoffice/users.csv', (request, response, next) => {
    let {users} = response
    const props = Object.keys(users[0]).sort().filter(prop => !prop.startsWith('__'))

    CSVStringify(
      [props].concat(
        users.map(user => props.map(prop => user[prop]))
      ),
      (error, csv) => {
        if (error){
          response.status(500).send(error.message)
        }else{
          response.setHeader('Content-Type', 'text/csv')
          response.setHeader("Content-Disposition", 'attachment; filename=users.csv')
          response.send(csv)
        }
      }
    )
  })

}
