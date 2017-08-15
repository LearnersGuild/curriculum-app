const fs = require('fs-extra')

const loadGlossary = () =>
  fs.readFile(__dirname+'/../../glossary/index.json')
    .then(JSON.parse)

module.exports = app => {

  if (process.env.NODE_ENV === 'development') {

    app.use((request, response, next) => {
      loadGlossary()
        .then(glossary => {
          response.locals.glossary = glossary
        })
        .then(next)
        .catch(next)
    })

  }else{

    loadGlossary()
      .then(glossary => {
        app.locals.glossary = glossary
      })
      .catch(error => {
        console.error(error)
        process.exit(1)
      })
  }

  app.get('/glossary', (request, response, next) => {
    response.render('glossary')
  })


}
