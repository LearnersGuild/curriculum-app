const { inspect } = require('util')
const fs = require('fs-extra')
const { getDigest } = require('.')
const {
  APP_ROOT,
  nameToId,
} = require('./utils')

const helpers = { nameToId }

helpers.expectDirectoriesWithREADMEToExist = function(directory, subdirectories){
  return expectFilesToExists(
    subdirectories.map(subdirectory =>
      `${directory}/${subdirectory}/README.md`
    )
  )
}

helpers.validId = function(id){
  return !!id.match(/^[-\w\d]+$/i)
}

helpers.validModuleId = function(moduleId){
  return this.validId(moduleId) && (moduleId in this.digest.modules)
}

helpers.validSkillId = function(skillId){
  return this.validId(skillId) && (skillId in this.digest.skills)
}

helpers.validChallengeId = function(challengeId){
  return this.validId(challengeId) && (challengeId in this.digest.challenges)
}

helpers.validPhaseId = function(phaseId){
  return phaseId in this.digest.phases
}

// this.validateRecords('modules', function(moduleId, module, logError){
//
// })
helpers.validateRecords = function(collection, validator){
  const errors = []

  Object.entries(this.digest[collection]).forEach(([recordId, record], index) => {

    const logError = message =>
      errors.push(`${collection}/${recordId}/README.md - ${message}`)

    try{

      if (typeof record !== 'object'){
        logError('is not an object')
        return
      }

      if (Array.isArray(record)){
        logError('is an array')
        return
      }

      if (record.id !== recordId){
        logError(`id does not match key in digest.${collection}`)
      }

      // if (record.path != `/${collection}/${recordId}`){
      //   logError(`invalid path ${inspect(record.path)}`)
      // }

      if (record.READMEpath != `/${collection}/${recordId}/README.md`){
        logError(`invalid READMEpath ${inspect(record.READMEpath)}`)
      }

      validator(recordId, record, logError)

    }catch(error){
      logError(error.message+"\n"+error.stack)
    }

  })
  if (errors.length === 0) return
  throw new AssertionError(`Invalid ${collection}:\n  `+errors.join("\n  "))
}

// const validSkill = skill => {
//   const messagePrefix = `Skill Validation Error for skill ${JSON.stringify(skill)}\n`
//   if (skill.match(/^\s*$/)){
//     throw new Error(`${messagePrefix}\nskills is empty`)
//   }
//   if (skill.match(/\.\s*$/)){
//     throw new Error(`${messagePrefix}\nskills should not end in a period`)
//   }
//   if (skill.match(/^Can\s+explain\s+/i)){
//     throw new Error(`${messagePrefix}\n"Can explain " should be "Can describe"`)
//   }
//   return true
// }

helpers.expectValidSkillIds = function(skillIds){
  const invalidSkillIds = skillIds.filter(skillId =>
    this.validSkillId(skillId)
  )
  if (invalidSkillIds.length === 0) return
  throw new AssertionError(
    'invalid skills:\n  '+
    invalidSkillIds.join("\n  ")
  )
}


const initializeDigestTest = function(){
  Object.assign(this, helpers)
  return getDigest().then(digest => {
    this.digest = digest
  })
}


module.exports = {
  initializeDigestTest,
}
