const path = require('path')
const fs = require('fs-extra')
const renderMarkdown = require('./renderMarkdown')

const APP_ROOT = path.resolve(__dirname, '..')

module.exports.load = function loadCurriculum(){

  const curriculum = {}
  curriculum.skills = []

  const loadModules = () =>
    fs.readdir(APP_ROOT+'/modules')
      .then(modules => {
        curriculum.modules = modules
          .filter(module => !/\.md$/.test(module))
          .sort()
      })

  const loadPhases = () =>
    fs.readdir(APP_ROOT+'/phases')
      .then(phases => {
        curriculum.phases = phases
      })

  const loadSkills = () =>
    Promise.all(
      curriculum.phases.map(loadSkillsForPhase)
    )

  const loadSkillsForPhase = (phase) =>
    fs.readFile(`${APP_ROOT}/phases/${phase}/README.md`)
      .then(file => file.toString())
      .then(markdown =>
        extractSkillsFromMarkdown(phase, markdown)
      )
      .then(skills => {
        curriculum.skills = curriculum.skills.concat(skills)
      })

  const extractSkillsFromMarkdown = (phase, markdown) => {
    console.log('phase =====>', phase)
    console.log('???', renderMarkdown.lexer(markdown))
    return []
  }


  return Promise.all([
    loadModules(),
    loadPhases(),
  ])
  .then(loadSkills)
  .then(_ => curriculum)

}
