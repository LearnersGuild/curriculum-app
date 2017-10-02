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

  app.get(/\/backoffice\/users\/(\w+)(?:$|\.(json|csv))/, (request, response, next) => {
    const handle = request.params["0"]
    const format = (request.params["1"] || 'html').toLowerCase()

    request.backOffice.getUserByHandle(handle, {
      active: undefined,
      includePhases: true,
      includeHubspotData: true,
    })
    .then(user => {
      if (format === 'html'){
        response.render('backoffice/users/show', { user })
      }
      if (format === 'json'){
        response.json({ user })
      }
      if (format === 'csv'){
        const csv = ''
        response.setHeader('Content-Type', 'text/csv')
        response.setHeader("Content-Disposition", 'attachment; filename=users.csv')
        response.send(csv)
      }
    })
    .catch(next)
  })

  // Error Handler
  app.use('/backoffice', (error, req, res, next) => {
    let status = error.code || error.status
    if (typeof status !== 'number') status = 500
    const stack = process.env.NODE_ENV === 'development'
      ? error.stack
      : null
    const json = {
      error: {},
    }
    Object.assign(json.error, error)
    json.error.message = error.message
    json.error.stack = stack
    res.status(status).json(json);
  })


}
