const utils = require('./utils')

module.exports = () =>
  utils.readdir('/glossary')
    .then(convertGlossaryFileNamesToTerms)
    .then(loadTermValues)
    .then(utils.indexById)

const convertGlossaryFileNamesToTerms = glossaryFileName =>
  glossaryFileName
    .filter(utils.noExtension)
    .map(fileName => ({
      id: fileName,
      value: fileName.replace(/-/g, ' '),
      path: `/glossary/${fileName}`,
    }))

const loadTermValues = terms =>
  Promise.all(
    terms.map(term =>
      utils.readMarkdownFile(`/glossary/${term.id}/README.md`)
        .then(document => {
          const heading = document.find( token => token.type === 'heading' && token.depth === 1 )
          if (heading) term.value = heading.text
          return term
        })
    )
  )
