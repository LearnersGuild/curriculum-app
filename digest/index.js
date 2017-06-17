const path = require('path')
const fs = require('fs-extra')
const loadModules = require('./modules')
const loadPhases = require('./phases')
const loadSkills = require('./skills')

const APP_ROOT = path.resolve(__dirname, '..')


module.exports = function digest(){

  const curriculum = {
    root: APP_ROOT,
  }

  return Promise.all([
    loadModules(curriculum),
    loadPhases(curriculum)
  ])
    .then(_ => curriculum)
    .then(loadSkills)
    .then(_ => curriculum)

}
