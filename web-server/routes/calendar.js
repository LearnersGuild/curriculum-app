const loadDigest = require('../../digest')

module.exports = app => {

  app.get('/calendar', (request, response, next) => {
    response.render('calendar', {title: 'Calendar'})
  })

}
