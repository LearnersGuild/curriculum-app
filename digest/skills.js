const utils = require('./utils')

module.exports = digest => {

  digest.skills = {}

  const getSkillByRawText = rawText => {
    assertValidSkillRawText(rawText)
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
    newSkill.contexts = digest.skillContexts.filter(skillContext =>
      newSkill.name.toLowerCase().includes(skillContext.toLowerCase())
    )
    assertSkillContainsAtLeastOneSkillContext(newSkill)
    digest.skills[id] = newSkill
    return newSkill
  }

  const assertValidSkillRawText = (rawText) => {
    const messagePrefix = `Skill Validation Error for skill ${JSON.stringify(rawText)}\n`
    if (rawText.match(/^\s*$/)){
      throw new Error(`${messagePrefix}\nskills is empty`)
    }
    if (rawText.match(/\.\s*$/)){
      throw new Error(`${messagePrefix}\nskills should not end in a period`)
    }
    if (rawText.match(/^Can\s+explain\s+/i)){
      throw new Error(`${messagePrefix}\n"Can explain " should be "Can describe"`)
    }
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

  const assertSkillContainsAtLeastOneSkillContext = (skill) => {
    if (skill.contexts.length === 0){
      throw new Error(
        `Skill Missing Context Error for skill ${JSON.stringify(skill.name)}\n`+
        `Found in modules:\n  ${skill.modules.join("\n  ")}`
      )
    }

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
