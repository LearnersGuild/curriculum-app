const { initializeDigestTest } = require('./test.helpers')

describe('digest.skills', function(){

  beforeEach(initializeDigestTest)

  it('should be an object', function() {
    expect(this.digest.skills).to.be.a('object')
    expect(this.digest.skills).to.not.be.an('array')
  })

  it('should not be empty', function(){
    expect(Object.keys(this.digest.skills).length).to.be.gt(0)
  })

  it('should have valid skills', function(){
    this.validateRecords('skills', (skillId, skill, logError) => {
      if (!this.validSkillId(skillId)){
        logError('invalid skill id')
      }
      if (typeof skill.name !== 'string'){
        logError('skill.name is not a string')
      }else{
        if (this.nameToId(skill.name) !== skill.id)
          logError('skill.name does not match skill.id '+JSON.stringify(this.nameToId(skill.name)))
      }
      if (!Array.isArray(skill.modules)){
        logError('skill.modules is not an array')
      }else{
        const invalidModules = skill.modules.filter(moduleId => !this.validModuleId(moduleId))
        if (invalidModules.length > 0) logError(
          'Invalid Modules:\n    '+(invalidModules.join("\n    "))
        )
      }
    })
  })

})
