const utils = require('./utils')

module.exports = () =>
  loadModuleDirectoryNames()
    .then(convertModuleDirectoryNamesToModules)
    .then(extractModuleDetails)
    .then(indexById)

const loadModuleDirectoryNames = () =>
  utils.readdir('/modules')

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
      utils.readMarkdownFile(module.path+'/README.md')
        .then(document => {
          module.skills = utils.extractListFromSection(document, 'Skills', 2)
            .map(stripSkillLabel)
          return module
        })
    )
  )

const indexById = modules =>
  modules.reduce((index, module) => {
    index[module.id] = module
    return index
  }, {})


const noExtension = module => !module.includes('.')

const stripSkillLabel = name =>
  name
    .replace(/^\s*\[\s+\]\s+/, '')
    .replace(/\s+$/, '')
