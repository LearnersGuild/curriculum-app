const loadModules = require('./modules')
const loadPhases = require('./phases')
const loadSkills = require('./skills')
const generateReport = require('./report')

module.exports = () =>
  Promise.all([loadModules(), loadPhases()])
  .then(([modules, phases]) => ({modules, phases}))
  .then(loadSkills)
  .then(generateReport)
