const loadGlossary = require('../../glossary').load

module.exports = app => {

  app.get('/glossary', (request, response, next) => {
    loadGlossary()
    .then(glossary => {
      response.render('glossary', { glossary })
    })
    .catch(next)
  })


}
