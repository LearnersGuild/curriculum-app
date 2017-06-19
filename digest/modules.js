const fs = require('fs-extra')
const Path = require('path')
const parseMarkdown = require('./parseMarkdown')
module.exports = function(curriculum){

  const loadModuleDirectoryNames = () =>
    fs.readdir(curriculum.root+'/modules')

  const convertModuleDirectoryNamesToModules = moduleDirectoryNames =>
    moduleDirectoryNames
      .filter(noExtension)
      .sort()
      .map(directoryName => ({
        directoryName,
        id: directoryName,
        name: directoryName.replace(/-/g, ' '),
        path: `/modules/${directoryName}`,
      }))

  const extractModuleDetails = modules =>
    Promise.all(
      modules.map(module =>
        fs.readFile(curriculum.root+module.path+'/README.md')
          .then(parseMarkdown)
          .then(document => {
            module.skills = parseMarkdown
              .extractListFromSection(document, 'Skills', 2)
              .map(stripSkillLabel)
            return module
          })
      )
    )

  const indexModulesIntoCurriculum = modules => {
    curriculum.modules = {}
    modules.forEach(module => {
      curriculum.modules[module.id] = module
    })
    return curriculum
  }

  return loadModuleDirectoryNames()
    .then(convertModuleDirectoryNamesToModules)
    .then(extractModuleDetails)
    .then(indexModulesIntoCurriculum)
}

const noExtension = module => !module.includes('.')

const stripSkillLabel = name =>
  name
    .replace(/^\s*\[\s+\]\s+/, '')
    .replace(/\s+$/, '')
