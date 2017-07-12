const utils = require('./utils')

module.exports = digest => {

  digest.skills = {}

  const getSkillByRawText = rawText => {
    const name = utils.rawTextToName(rawText)
    const id = utils.nameToId(name)
    const newSkill = {
      id,
      name,
      rawText,
      modules: [],
      path: `/skills/${encodeURIComponent(id)}`,
    }
    const preExistingSkill = digest.skills[id]
    if (preExistingSkill){
      assertIdenticalSkills(preExistingSkill, newSkill)
      return preExistingSkill
    }
    digest.skills[id] = newSkill
    return newSkill
  }

  const assertIdenticalSkills = (preExistingSkill, newSkill) => {
    ['name','rawText'].forEach(key => {
      if (preExistingSkill[key] !== newSkill[key]){
        throw new Error(
          `Skill MissMatch Error for skill ${newSkill.id}\n`+
          `skill.${key} did not match\n`+
          `expected: ${JSON.stringify(preExistingSkill[key])}\n`+
          `recieved: ${JSON.stringify(newSkill[key])}\n`
        )
      }
    })

  }

  utils.values(digest.modules).forEach(module => {
    module.skills = module.skills
      .map(getSkillByRawText)
      .map(skill => {
        skill.modules.push(module.id)
        return skill.id
      })
  })

  utils.values(digest.phases).forEach(phase => {
    phase.skills = []
    phase.modules.forEach(id => {
      const module = digest.modules[id]
      if (!module) return
      module.skills.forEach(skillId =>
        phase.skills.includes(skillId) || phase.skills.push(skillId)
      )
    })
  })

  return digest
}
