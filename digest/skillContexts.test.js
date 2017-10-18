const { initializeDigestTest } = require('./test.helpers')

describe('digest.skillContexts', function(){
  beforeEach(initializeDigestTest)

  it('should be an array', function() {
    expect(this.digest.skillContexts).to.be.an('array')
  })

  it('should be alpha sorted', function(){
    expect(this.digest.skillContexts).to.equal(
      this.digest.skillContexts.sort()
    )
  })

})
