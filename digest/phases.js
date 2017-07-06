const utils = require('./utils')

module.exports = () =>
  utils.readdir('/phases')
    .then(phaseNumbers =>
      phaseNumbers.filter(phaseNumber => phaseNumber == Number(phaseNumber))
    )
    .then(phaseNumbersToPhases)
    .then(loadDetails)
    .then(indexByNumber)

const phaseNumbersToPhases = numbers =>
  numbers.map(number => (
    {
      number: Number.parseInt(number),
      path: `/phases/${number}`,
    }
  ))

const loadDetails = phases =>
  Promise.all(
    phases.map(phase =>
      utils.readMarkdownFile(`${phase.path}/README.md`)
      .then(document => {
        phase.modules =
          utils.extractListFromSection(document, 'Modules', 2)
          .map(moduleLink => parseResourceText(moduleLink, 'modules'))
        phase.goals =
          utils.extractListFromSection(document, 'Goals', 2)
          .map(goalLink => parseResourceText(goalLink, 'goals'))
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

const parseResourceText = (text, folderName) => {
  let [_, icon, name, path] = text.match(/([^\[]+?)\s*\[([^\]]+)\]\(([^\(]+)\)/)
  let id = path.split(`/${folderName}/`)[1]
  // let type = (
  //   icon === "🤸" ? 'practice' :
  //   icon === "🏋" ? 'benchmark' :
  //   undefined
  // )
  return id
  // return {id, type, name, path}
}
