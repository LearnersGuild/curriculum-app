const utils = require('./utils')

module.exports = () =>
  loadModuleDirectoryNames()
    .then(convertModuleDirectoryNamesToModules)
    .then(extractModuleDetails)
    .then(utils.indexById)

const loadModuleDirectoryNames = () =>
  utils.readdir('/modules')

const convertModuleDirectoryNamesToModules = moduleDirectoryNames =>
  moduleDirectoryNames
    .filter(utils.noExtension)
    .sort()
    .map(directoryName => ({
      directoryName,
      id: directoryName,
      name: directoryName.replace(/-/g, ' '),
      path: `/modules/${encodeURIComponent(directoryName)}`,
    }))

const extractModuleDetails = modules =>
  Promise.all(
    modules.map(module =>
      utils.readMarkdownFile(module.path+'/README.md')
        .then(document => {
          module.skills = utils.extractListFromSection(document, 'Skills', 2)
            .map(skill => skill.trim())
          return module
        })
    )
  )
