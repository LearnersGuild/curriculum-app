const {
  readDirectoriesWithREADMEs,
  getHeadingFromMarkdown,
  removeREADMEMarkdown,
  mapToObjectBy,
} = require('./utils')

module.exports = () =>
  readDirectoriesWithREADMEs('/glossary')
  .then(terms => {
    terms.forEach(term => {
      term.value = term.name
      delete term.name
    })
    return terms
  })
  .then(removeREADMEMarkdown)
  .then(mapToObjectBy('id'))
