const fs = require('fs-extra')
const parseMarkdown = require('./parseMarkdown')

module.exports = function(curriculum){

  const findModuleByName = name =>
    curriculum.modules.find(module =>
      module.name === name
    )

  curriculum.phases.forEach(phase => {
    phase.skills = {}
    phase.modules.forEach(({name}) => {
      const module = findModuleByName(name)
      // console.log('findModuleByName', name, module)
      if (!module) console.log('CANNOT FIND MODULES', name)
      if (!module) return
      module.skills.forEach(skillName => {
        const skill = phase.skills[skillName] = phase.skills[skillName] || {
          name: skillName,
          modules: []
        }
        skill.modules.push(module.name)
      })
    })
    Object.keys(phase.skills).forEach(key => {
      const skill = phase.skills[key]
      skill.numberOfModules = skill.modules.length
    })
  })

}
