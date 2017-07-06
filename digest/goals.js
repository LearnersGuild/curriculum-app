const utils = require('./utils')

module.exports = () =>
  loadGoalDirectoryNames()
    .then(convertGoalDirectoryNamesToGoals)
    .then(extractGoalDetails)
    .then(indexById)

const loadGoalDirectoryNames = () =>
  utils.readdir('/goals')

const convertGoalDirectoryNamesToGoals = goalDirectoryNames => {
  return goalDirectoryNames
    .filter(noExtension)
    .sort()
    .map(directoryName => ({
      directoryName,
      id: directoryName,
      name: directoryName.replace(/-/g, ' '),
      path: `/goals/${encodeURIComponent(directoryName)}`,
    }))
}

const extractGoalDetails = goals =>
  Promise.all(
    goals.map(goal =>
      utils.readMarkdownFile(goal.path+'/README.md')
        .then(document => {
          goal.skills = utils.extractListFromSection(document, 'Skills', 2)
            .map(skill => skill.trim())
          return goal
        })
    )
  )

const indexById = goals =>
  goals.reduce((index, goal) => {
    index[goal.id] = goal
    return index
  }, {})


const noExtension = goal => !goal.includes('.')
