const { initializeDigestTest } = require('./test.helpers')

describe('digest.phases', function(){

  beforeEach(initializeDigestTest)

  it('should be an object', function() {
    expect(this.digest.phases).to.be.a('object')
    expect(this.digest.phases).to.not.be.an('array')
  })

  it('should not be empty', function(){
    expect(Object.keys(this.digest.phases).length).to.be.gt(0)
  })

  it('should have 6 phases', function(){
    expect(Object.keys(this.digest.phases)).to.eql('012345'.split(''))
  })

  it('should have valid phases', function(){
    this.validateRecords('phases', (phaseId, phase, logError) => {
      if (!this.validPhaseId(phaseId)){
        logError('invalid phase id')
      }
      if (typeof phase.name !== 'string'){
        logError('phase.name is not a string')
      }
      if (!Array.isArray(phase.challenges)){
        logError('phase.challenges is not an array')
      }else{
        const invalidChalenges = phase.challenges.filter(skillId => !this.validChallengeId(skillId))
        if (invalidChalenges.length > 0) logError(
          'Invalid Chalenges:\n    '+(invalidChalenges.join("\n    "))
        )
      }

      // if (!Array.isArray(phase.skills)){
      //   logError('phase.skills is not an array')
      // }else{
      //   const invalidSkills = phase.skills.filter(skillId => !this.validSkillId(skillId))
      //   if (invalidSkills.length > 0) logError(
      //     'Invalid Skills:\n    '+(invalidSkills.join("\n    "))
      //   )
      // }
    })
  })

})
