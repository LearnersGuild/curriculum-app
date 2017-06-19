const utils = require('./utils')

module.exports = digest => {
  const report = digest.report = {
    missingModules: [],
    missingSkills: [],
    skillsThatSuck: [],
    skillsThatAreShort: [],
    skillsThatHaveFormattingErrors: [],
    skillsMissingContext: [],
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

  utils.values(digest.skills).forEach(skill => {
    if (
      skill.name.match(/^can /)
    ){
      report.skillsThatSuck.push(skill.rawText)
    }

    if (
      skill.name.split(/\s+/).length < 4
    ){
      report.skillsThatAreShort.push(skill.rawText)
    }

    if (
      skill.name.match(/\W(javascript|express|node|git)\W/)
    ){
      report.skillsThatHaveFormattingErrors.push(skill.rawText)
    }

    if (
      !skill.name.match(/JavaScript|Node|Browser/)
    ){
      report.skillsMissingContext.push(skill.rawText)
    }
  })

  return digest
}
