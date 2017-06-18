const fs = require('fs-extra')
const parseMarkdown = require('./parseMarkdown')

module.exports = function(curriculum){

  const findModuleByName = name =>
    curriculum.modules.find(module =>
      module.name === name
    )

  curriculum.skills = {}

  const getSkillByName = name =>
    curriculum.skills[name] = curriculum.skills[name] || {
      name, modules: []
    }

  curriculum.phases.forEach(phase => {
    phase.skills = []
    phase.modules.forEach(({name}) => {
      // console.log('--- skills extraction')
      const module = findModuleByName(name)
      // console.log('findModuleByName', name, module)
      if (!module) console.log('CANNOT FIND MODULE', `phase ${phase.number}`, name)
      if (!module) return
      module.skills.forEach(skillName => {
        phase.skills.push(skillName)
        getSkillByName(skillName).modules.push(module.name)
      })
    })
  })

}
