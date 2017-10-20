const { initializeDigestTest } = require('./test.helpers')

describe('digest.challenges', function(){

  beforeEach(initializeDigestTest)

  it('should be an object', function() {
    expect(this.digest.challenges).to.be.a('object')
    expect(this.digest.challenges).to.not.be.an('array')
  })

  it('should not be empty', function(){
    expect(Object.keys(this.digest.challenges).length).to.be.gt(0)
  })


  it('should have valid challenges', function(){
    this.validateRecords('challenges', (challengeId, challenge, logError) => {
      if (!this.validChallengeId(challengeId)){
        logError('invalid challenge id')
      }
      if (typeof challenge.name !== 'string'){
        logError('challenge.name is not a string')
      }else{
        if (this.nameToId(challenge.name) !== challenge.id)
          logError('challenge.name does not match challenge.id '+JSON.stringify(this.nameToId(challenge.name)))
      }
      if (!Array.isArray(challenge.skills)){
        logError('challenge.skills is not an array')
      }else{
        const invalidSkills = challenge.skills.filter(skillId => !this.validSkillId(skillId))
        if (invalidSkills.length > 0) logError(
          'Invalid Skills:\n    '+(invalidSkills.join("\n    "))
        )
      }
    })
  })

})
