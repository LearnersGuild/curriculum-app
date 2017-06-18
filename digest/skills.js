const fs = require('fs-extra')
const parseMarkdown = require('./parseMarkdown')

module.exports = function(curriculum){

  curriculum.skills = {}

  const getSkillByName = name =>
    curriculum.skills[name] = curriculum.skills[name] || {
      name, modules: []
    }

  curriculum.phases.forEach(phase => {
    phase.skills = []
    phase.modules.forEach(({id}) => {
      const module = curriculum.modules[id]
      if (!module) return
      module.skills.forEach(skillName => {
        phase.skills.push(skillName)
        getSkillByName(skillName).modules.push(module.id)
      })
    })
  })

}
