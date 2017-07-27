const loadModules = require('./modules')
const loadPhases = require('./phases')
const loadSkills = require('./skills')
const loadCOSWorkshops = require('./cos')
const generateReport = require('./report')

module.exports = () =>
  Promise.all([
    loadModules(),
    loadPhases(),
    loadCOSWorkshops(),
  ])
  .then(
    ([
      modules,
      phases,
      COSWorkshops
    ]) => ({
      modules,
      phases,
      COSWorkshops,
    })
  )
  .then(digest => {
    digest.skillContexts = [
      'Bash',
      'Browser',
      'Chrome Developer Tools',
      'Compensation',
      'CSS',
      'Editor',
      'Encryption',
      'Express',
      'General Programming',
      'Git',
      'GitHub',
      'Google',
      'Heroku',
      'Hiring',
      'HTML & CSS',
      'HTML',
      'HTTP',
      'JavaScript',
      'Node',
      'Regular Expressions',
      'shell',
      'Slack',
      'SQL',
      'Terminal',
      'test',
      'UNIX',
    ].sort()
    return digest
  })
  .then(loadSkills)
  .then(generateReport)
