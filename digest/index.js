const loadModules = require('./modules')
const loadPhases = require('./phases')
const loadSkills = require('./skills')
const generateReport = require('./report')

module.exports = () =>
  Promise.all([loadModules(), loadPhases()])
  .then(([modules, phases]) => ({modules, phases}))
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
      'Jobs',
      'LinkedIn',
      'Networking',
      'Node',
      'Regular Expression',
      'shell',
      'Slack',
      'SQL',
      'Terminal',
      'tests',
      'UNIX',
      'postgresql',
    ].sort()
    return digest
  })
  .then(loadSkills)
  .then(generateReport)
