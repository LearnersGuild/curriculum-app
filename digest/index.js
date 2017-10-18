const {
  promiseMap,
  nameToId,
} = require('./utils')
const loadChallenges = require('./challenges')
const loadModules = require('./modules')
const loadPhases = require('./phases')
const loadSkills = require('./skills')
const loadGlossary = require('./glossary')
const skillContexts = require('./skillContexts')
const generateReport = require('./report')

let digestPromise
const getDigest = () => {
  if (!digestPromise) {
    digestPromise = loadDigest()
    return getDigest()
  }
  return digestPromise.then(clone)
}

const clone = digest =>
  JSON.parse(JSON.stringify(digest))

const loadDigest = () =>
  promiseMap({
    skillContexts,
    challenges: loadChallenges(),
    modules: loadModules(),
    phases: loadPhases(),
    skills: loadSkills(),
    glossary: loadGlossary(),
  })
  .then(digest => {
    addModulesAndChallengesToSkills(digest)
    addSkillsToPhases(digest)
    console.log('DIGEST: done')
    return digest
  })



const addModulesAndChallengesToSkills = digest => {
  Object.values(digest.skills).forEach(skill => {
    skill.modules = Object.values(digest.modules)
      .filter(module => module.skills.includes(skill.id))
      .map(module => module.id)
    skill.challenges = Object.values(digest.challenges)
      .filter(challenge => challenge.skills.includes(skill.id))
      .map(challenge => challenge.id)
  })
}

const addSkillsToPhases = digest => {
  Object.values(digest.phases).forEach(phase => {
    phase.skills = []
    phase.challenges.forEach(challengeId => {
      const challenge = digest.challenges[challengeId]
      if (!challenge) return
      challenge.skills.forEach(skill => {
        phase.skills.includes(skill) || phase.skills.push(skill)
      })
    })
  })
}

module.exports = {
  getDigest,
  loadDigest,
}
