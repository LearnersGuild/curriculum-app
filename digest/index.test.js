const { loadDigest } = require('.')
const { initializeDigestTest } = require('./test.helpers')

describe('loadDigest', function(){

  it('should be a function', function(){
    expect(loadDigest).to.be.a('function')
  })

  it('should return a promise', function(){
    expect(loadDigest()).to.be.an.instanceof(Promise)
  })

  describe('results', function(){
    beforeEach(initializeDigestTest)

    it('should return an object', function(){
      expect(this.digest).to.be.an('object')
    })

    it('should have keys', function(){
      const keys = Object.keys(this.digest)
      expect(keys).to.include("glossary")
      expect(keys).to.include("modules")
      expect(keys).to.include("phases")
      expect(keys).to.include("skillContexts")
      expect(keys).to.include("skills")
    })
  })

})
