const fs = require('fs-extra')
const nameToId = require('./nameToId')
const parseMarkdown = require('./parseMarkdown')

module.exports = function(curriculum){

  curriculum.skills = {}

  const getSkillByName = name => {
    const id = nameToId(name)
    return curriculum.skills[id] = curriculum.skills[id] || {
      id, name, modules: []
    }
  }

  Object.keys(curriculum.modules).forEach(moduleId => {
    const module = curriculum.modules[moduleId]
    module.skills.forEach(skillName => {
      const skill = getSkillByName(skillName)
      skill.modules.push(module.id)
    })
  })

  curriculum.phases.forEach(phase => {
    phase.skills = []
    phase.modules.forEach(id => {
      const module = curriculum.modules[id]
      if (!module) return
      module.skills.forEach(skillName => {
        phase.skills.push(getSkillByName(skillName).id)
      })
    })
  })

}
