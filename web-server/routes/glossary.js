const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../../database/queries')
const commands = require('../../database/commands')

module.exports = app => {

  app.get('/glossary', app.ensureTrailingSlash, (request, response, next) => {
    const userId = request.user.id
    const termSlugs = response.digest.glossary
    response.render('glossary/index', {
      termSlugs,
      title: 'Glossary Terms',
    })
  })

  app.get('/glossary/:termSlug', app.ensureTrailingSlash)

  app.get('/glossary/:termSlug', (request, response, next) => {
    const { termSlug } = request.params

    const term = response.digest.glossary[termSlug]
    if (!term) return response.renderNotFound()

    response.renderMarkdownFile(`/glossary/${termSlug}/README.md`)
  })

}
