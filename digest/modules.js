const fs = require('fs-extra')
const Path = require('path')
const parseMarkdown = require('./parseMarkdown')
module.exports = function(curriculum){

  const extractSkills = (module, document) => {
    module.skills = parseMarkdown.extractListFromSection(document, 'Skills', 2)
    // module.resources = parseMarkdown.extractListFromSection(document, 'Resources', 2)
    // module.exercises = parseMarkdown.extractListFromSection(document, 'Exercises', 2)

    module.skills = module.skills.map(name =>
      name
        .replace(/^\s*\[\s+\]\s+/, '')
        .replace(/\s+$/, '')
    )

    return document
  }

  // go through all the phase/*/README.md and extract each module
  const extractModuleDetails = module =>
    fs.readFile(module.path+'/README.md')
      .then(file => parseMarkdown(file.toString()))
      .then(document => extractSkills(module, document))



  return fs.readdir(curriculum.root+'/modules')
  .then(modules => {
    curriculum.modules = modules
      .filter(noExtension)
      .sort()
      .map(directoryName => ({
        name: directoryName.replace(/-/g, ' '),
        path: `${curriculum.root}/modules/${directoryName}`,
      }))

    return Promise.all([
      curriculum.modules.map(extractModuleDetails)
    ]).then(_ => curriculum)
  })

}


const noExtension = module => !module.includes('.')
