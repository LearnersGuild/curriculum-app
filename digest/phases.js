const fs = require('fs-extra')
const Path = require('path')
const parseMarkdown = require('./parseMarkdown')

module.exports = function(curriculum){

  const extractModules = (phase, document) => {
    phase.modules =
      parseMarkdown.extractListFromSection(document, 'Modules', 2)
      .map(module => parseModuleText(module, phase))

    return document
  }

  const loadPhaseDetails = phase =>
    fs.readFile(
      phase.readmePath = `${curriculum.root}/phases/${phase.number}/README.md`
    )
      .then(file => parseMarkdown(file.toString()))
      .then(document => extractModules(phase, document))

  return fs.readdir(curriculum.root+'/phases')
    .then(phases => {
      curriculum.phases = phases.map(newPhase)
      return Promise.all(
        curriculum.phases.map(loadPhaseDetails)
      )
    })
}

const newPhase = number => ({number})

const isModulesHeading = token =>
  token.type === 'heading' &&
  token.depth === 2 &&
  token.text === 'Modules'

const parseModuleText = (text, phase) => {
  let [_, icon, name, path] = text.match(/([^\[]+?)\s*\[([^\]]+)\]\(([^\(]+)\)/)
  // path = Path.resolve(phase.readmePath, '..', path)
  let id = path.split('/modules/')[1]
  // let type = (
  //   icon === "🤸" ? 'practice' :
  //   icon === "🏋" ? 'benchmark' :
  //   undefined
  // )
  return id
  // return {id, type, name, path}
}
