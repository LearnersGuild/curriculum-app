const loadModules = require('./modules')
const loadGoals = require('./goals')
const loadPhases = require('./phases')
const loadSkills = require('./skills')
const generateReport = require('./report')

module.exports = () =>
  Promise.all([loadModules(), loadPhases(), loadGoals()])
  .then(([modules, phases, goals]) => ({modules, phases, goals}))
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
    console.log('digest::', digest);
    return digest
  })
  .then(loadSkills)
  .then(generateReport)
