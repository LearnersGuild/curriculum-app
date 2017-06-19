const utils = require('./utils')

module.exports = digest => {
  const report = digest.report = {
    missingModules: [],
    missingSkills: [],
    skillsThatSuck: {},
    skillsThatAreShort: [],
    skillsThatHaveFormattingErrors: [],
    skillsMissingContext: [],
    explainToDescribe: [],
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
      !skill.name.match(/^Can /)
    ){
      report.skillsThatSuck[skill.rawText] = skill.modules
    }
    if (
      skill.name.match(/explain/)
    ){
      report.explainToDescribe[skill.rawText] = skill.modules
    }

    if (
      skill.name.split(/\s+/).length < 4
    ){
      report.skillsThatAreShort.push(skill.rawText)
    }

    if (
      skill.name.match(/(^|\W)(javascript|express|node|slack)(\W|$)/)
    ){
      report.skillsThatHaveFormattingErrors.push(skill.rawText)
    }

    if (
      !skill.name.match(/SQL|JavaScript|Node|Express|Browser|(g|G)it|Chrome Developer Tools|HTTP|HTML & CSS|Slack|Google|editor|terminal/)
    ){
      report.skillsMissingContext.push(skill.rawText)
    }
  })

  return digest
}
