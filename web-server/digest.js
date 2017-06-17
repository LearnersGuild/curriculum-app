const loadDigest = require('../digest')

module.exports = function(app){

  if (process.env.NODE_ENV === 'development') {

    app.use((request, response, next) => {
      loadDigest()
        .then(digest => {
          Object.assign(response.locals, digest)
        })
        .then(next)
        .catch(next)
    })

  }else{

    loadDigest()
      .then(digest => {
        Object.assign(app.locals, digest)
      })
      .catch(error => {
        console.error(error)
        process.exit(1)
      })
  }
}
