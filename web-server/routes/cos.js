module.exports = app => {

  app.get('/cos', app.ensureTrailingSlash, (request, response, next) => {
    response.renderMarkdownFile(`/cos/README.md`)
  })

  app.get('/cos/*', (request, response, next) => {
    response.renderFile(request.path)
  })

}
