const utils = require('./utils')

module.exports = digest => {

  digest.skills = {}

  const getSkillByName = name => {
    const id = utils.nameToId(name)
    return digest.skills[id] = digest.skills[id] || {
      id, name, modules: []
    }
  }

  Object.keys(digest.modules).forEach(moduleId => {
    const module = digest.modules[moduleId]
    module.skills.forEach(skillName => {
      const skill = getSkillByName(skillName)
      skill.modules.push(module.id)
    })
  })

  digest.phases.forEach(phase => {
    phase.skills = []
    phase.modules.forEach(id => {
      const module = digest.modules[id]
      if (!module) return
      module.skills.forEach(skillName => {
        phase.skills.push(getSkillByName(skillName).id)
      })
    })
  })

  return digest
}
