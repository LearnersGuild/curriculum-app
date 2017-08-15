const loadGlossary = require('../../glossary').load

module.exports = app => {

  app.get('/glossary', (request, response, next) => {
    loadGlossary()
    .then(glossary => {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'
      response.render('glossary', { 
        glossary,
        alphabet,
      })
    })
    .catch(next)
  })


}
