const fs = require('fs-extra')

const load = () =>
  fs.readFile(__dirname+'/index.json')
    .then(JSON.parse)
    .then(glossary =>
      Object.keys(glossary)
        .map(term => {
          glossary[term].term = term
          return glossary[term]
        })
        .sort((a, b) => {
          a = a.term.toLowerCase()
          b = b.term.toLowerCase()
          return a > b ? 1 : b > a ? -1 : 0
        })
    )


module.exports.load = load