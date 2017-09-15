const loadDigest = require('../../digest')

module.exports = app => {

  if (process.env.NODE_ENV === 'development') {

    app.use((request, response, next) => {
      loadDigest()
        .then(digest => {
          response.digest = digest
          response.locals.digest = digest
        })
        .then(next)
        .catch(next)
    })

    app.get('/digest', (request, response, next) => {
      response.render('digest', {title: 'Digest'})
    })

  }else{

    app.use((request, response, next) => {
      response.digest = app.locals.digest
      next()
    })

    loadDigest()
      .then(digest => {
        app.locals.digest = digest
      })
      .catch(error => {
        console.error(error)
        process.exit(1)
      })
  }

  app.get('/digest.json', (request, response, next) => {
    response.json(response.digest)
  })

}
