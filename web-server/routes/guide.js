module.exports = app => {

  app.get('/guide', (request, response, next) => {
    response.render('guide', {title: 'Guide'})
  })

}
