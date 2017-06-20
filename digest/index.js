const loadModules = require('./modules')
const loadPhases = require('./phases')
const loadSkills = require('./skills')
const generateReport = require('./report')

module.exports = () =>
  Promise.all([loadModules(), loadPhases()])
  .then(([modules, phases]) => ({modules, phases}))
  .then(digest => {
    digest.skillContexts = [
      'SQL',
      'JavaScript',
      'Node',
      'Express',
      'Browser',
      'Git',
      'Chrome Developer Tools',
      'HTTP',
      'HTML & CSS',
      'Slack',
      'Google',
      'editor',
      'terminal'
    ]
    return digest
  })
  .then(loadSkills)
  .then(generateReport)
