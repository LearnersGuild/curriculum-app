const utils = require('./utils')

module.exports = () =>
  loadModuleDirectoryNames()
    .then(convertModuleDirectoryNamesToModules)
    .then(extractModuleDetails)
    .then(indexById)

const loadModuleDirectoryNames = () =>
  utils.readdir('/modules')

const convertModuleDirectoryNamesToModules = moduleDirectoryNames => {
  return moduleDirectoryNames
    .filter(noExtension)
    .sort()
    .map(directoryName => ({
      directoryName,
      id: directoryName,
      name: directoryName.replace(/-/g, ' '),
      path: `/modules/${encodeURIComponent(directoryName)}`,
    }))
};
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

const indexById = modules => {
  console.log('$$$ modules::', modules);
  return modules.reduce((index, module) => {
    index[module.id] = module
    return index
  }, {})
}

const noExtension = module => !module.includes('.')
