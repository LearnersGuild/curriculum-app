const loadModules = require('./modules')
const loadPhases = require('./phases')
const loadSkills = require('./skills')
const loadGlossary = require('./glossary')
const generateReport = require('./report')

module.exports = () =>
  Promise.all([loadModules(), loadPhases(), loadGlossary()])
  .then(([modules, phases, glossary]) => ({modules, phases, glossary}))
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
      'Interviews',
      'JavaScript',
      'Jobs',
      'LinkedIn',
      'Networking',
      'Node',
      'Regular Expression',
      'shell',
      'Slack',
      'SQL',
      'System Design',
      'Terminal',
      'tests',
      'UNIX',
      'postgresql',
    ].sort()
    digest.phaseOrder = ['foundations', 'practice', 'area 45'];
    return digest
  })
  .then(loadSkills)
  .then(generateReport)
