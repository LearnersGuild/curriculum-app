const path = require('path')
const fs = require('fs-extra')
const loadModules = require('./modules')
const loadPhases = require('./phases')
const loadSkills = require('./skills')

const APP_ROOT = path.resolve(__dirname, '..')


module.exports = () =>
  Promise.all([loadModules(), loadPhases()])
  .then(([modules, phases]) => ({modules, phases}))
  .then(loadSkills)
