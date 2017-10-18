const { initializeDigestTest } = require('./test.helpers')

describe('digest.modules', function(){

  beforeEach(initializeDigestTest)

  it('should be an object', function() {
    expect(this.digest.modules).to.be.a('object')
    expect(this.digest.modules).to.not.be.an('array')
  })

  it('should not be empty', function(){
    expect(Object.keys(this.digest.modules).length).to.be.gt(0)
  })

  it('should have valid modules', function(){
    this.validateRecords('modules', (moduleId, module, logError) => {
      if (typeof module.name !== 'string'){
        logError('module.name is not a string')
      }else{
        if (this.nameToId(module.name) !== module.id)
          logError('module.name does not match module.id '+JSON.stringify(this.nameToId(module.name)))
      }
      if (!Array.isArray(module.skills)){
        logError('module.skills is not an array')
      }else{
        const invalidSkills = module.skills.filter(skillId => !this.validSkillId(skillId))
        if (invalidSkills.length > 0) logError(
          'Invalid Skills:\n    '+(invalidSkills.join("\n    "))
        )
      }
    })
  })

})
