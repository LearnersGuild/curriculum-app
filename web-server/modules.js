module.exports = app => {

  app.get('/modules/:moduleName', (request, response, next) => {
    const moduleName = request.params.moduleName
    const currentModule = response.digest.modules[moduleName]
    response.locals.currentModule = currentModule
    next()
  })

  app.get(/.*$/, (request, response, next) => {
    const path = request.path
    if (!/(\/|\.md)$/.test(path)){
      response.redirect(path+'/')
    }else{
      response.renderMarkdownFile()
    }
  })

}
