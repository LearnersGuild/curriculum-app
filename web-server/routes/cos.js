module.exports = app => {

  app.get('/cos', app.ensureTrailingSlash, (request, response, next) => {
    response.renderMarkdownFile(`/cos/README.md`)
  })

  app.get('/cos/passport', (request, response, next) => {
    response.render('cos/passport')
  })

  app.get('/cos/*', (request, response, next) => {
    response.renderFile(request.path)
  })

}
