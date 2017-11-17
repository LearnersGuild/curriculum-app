const utils = require('./utils')
const capitalize = require('lodash/capitalize');

module.exports = () =>
  utils.getDirectoriesSync('/phases')
    .then(phaseNumbersToPhases)
    .then(loadDetails)
    .then(indexByNumber)

const phaseNumbersToPhases = phases => {
  return phases.map(phase => (
    {
      number: phase,
      path: `/phases/${phase}`,
      humanName: capitalize(phase)
    }
  ))
};

const loadDetails = phases =>
  Promise.all(
    phases.map(phase =>
      utils.readMarkdownFile(`${phase.path}/README.md`)
      .then(document => {
        phase.modules =
          utils.extractListFromSection(document, 'Modules', 2)
          .map(parseModuleText)
        return document
      })
      .then(_ => phase)
    )
  )

const indexByNumber = phases =>
  phases.reduce((index, phase) => {
    index[phase.number] = phase
    return index
  }, {})

const isModulesHeading = token =>
  token.type === 'heading' &&
  token.depth === 2 &&
  token.text === 'Modules'

const parseModuleText = (text) => {
  const matches = text.match(/([^\[]+?)\s*\[([^\]]+)\]\(([^\(]+)\)/)
  if (!matches) return
  let [_, icon, name, path] = matches
  let id = path.split('/modules/')[1]
  // let type = (
  //   icon === "🤸" ? 'practice' :
  //   icon === "🏋" ? 'benchmark' :
  //   undefined
  // )
  return id
  // return {id, type, name, path}
}
