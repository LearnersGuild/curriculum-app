const fs = require('fs-extra')
const Path = require('path')
const parseMarkdown = require('./parseMarkdown')
module.exports = function(curriculum){



  const extractSkills = (module, document) => {
    module.skills = parseMarkdown.extractListFromSection(document, 'Skills', 2)
      .map(stripSkillLabel)

    return document
  }

  const extractModuleDetails = module =>
    fs.readFile(module.path+'/README.md')
      .then(file => parseMarkdown(file.toString()))
      .then(document => extractSkills(module, document))
      .then(_ => module)



  return fs.readdir(curriculum.root+'/modules')
  .then(modules => {
    modules = modules
      .filter(noExtension)
      .sort()
      .map(directoryName => ({
        id: directoryName,
        name: directoryName.replace(/-/g, ' '),
        path: `${curriculum.root}/modules/${directoryName}`,
      }))

    return Promise.all(
      modules.map(extractModuleDetails)
    ).then(modules => {
      curriculum.modules = {}
      modules.forEach(module => {
        curriculum.modules[module.id] = module
      })
      return curriculum
    })
  })

}


const noExtension = module => !module.includes('.')

const stripSkillLabel = name =>
  name
    .replace(/^\s*\[\s+\]\s+/, '')
    .replace(/\s+$/, '')
