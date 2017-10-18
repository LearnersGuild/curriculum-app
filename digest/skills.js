const {
  readDirectoriesWithREADMEs,
  renderNameAsHTML,
  removeREADMEMarkdown,
  mapToObjectBy,
} = require('./utils')

module.exports = () =>
  readDirectoriesWithREADMEs('/skills')
  .then(renderNameAsHTML)
  .then(removeREADMEMarkdown)
  .then(mapToObjectBy('id'))
