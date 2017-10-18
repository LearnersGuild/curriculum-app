const {
  readDirectoriesWithREADMEs,
  extractSkillsFromREADMEMarkdowns,
  removeREADMEMarkdown,
  mapToObjectBy,
} = require('./utils')

module.exports = () =>
  readDirectoriesWithREADMEs('/challenges')
  .then(extractSkillsFromREADMEMarkdowns)
  .then(removeREADMEMarkdown)
  .then(mapToObjectBy('id'))

  // // load details from README
  // .then(challenges =>
  //   Promise.all(
  //     challenges.map(challenge => )
  //   )
  // )



// const loadModuleDirectoryNames = () =>
//   utils.readdir('/modules')

// const convertModuleDirectoryNamesToModules = moduleDirectoryNames =>
//   moduleDirectoryNames
//     .filter(noExtension)
//     .sort()
//     .map(directoryName => ({
//       directoryName,
//       id: directoryName,
//       name: directoryName.replace(/-/g, ' '),
//       path: `/modules/${encodeURIComponent(directoryName)}`,
//     }))

// const extractModuleDetails = modules =>
//   Promise.all(
//     modules.map(module =>
//       utils.readMarkdownFile(module.path+'/README.md')
//         .then(document => {
//           module.skills = utils.extractListFromSection(document, 'Skills', 2)
//             .map(skill => skill.trim())
//           return module
//         })
//     )
//   )

// const indexById = modules => {
//   return modules.reduce((index, module) => {
//     index[module.id] = module
//     return index
//   }, {})
// }

// const noExtension = module => !module.includes('.')
