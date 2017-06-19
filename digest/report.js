const utils = require('./utils')

module.exports = digest => {
  const report = digest.report = {
    missingModules: [],
    missingSkills: [],
  }

  const getModuleById = moduleId =>
    digest.modules[moduleId]

  // report.phases.forEach(phase)
  utils.values(digest.phases).forEach(phase => {
    phase.modules.map(moduleId => {
      const module = getModuleById(moduleId)
      if (!module) report.missingModules.push(moduleId)
    })
  })


  return digest
}
