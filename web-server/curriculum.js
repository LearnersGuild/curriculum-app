const path = require('path')
const fs = require('fs-extra')

const APP_ROOT = path.resolve(__dirname, '..')

module.exports.load = function loadCurriculum(){

  const curriculum = {}

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

  return Promise.all([
    loadModules(),
    loadPhases(),
  ])
  .then(_ => curriculum)

}
