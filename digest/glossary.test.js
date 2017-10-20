const { initializeDigestTest } = require('./test.helpers')

describe('digest.glossary', function(){

  beforeEach(initializeDigestTest)

  it('should be an object', function() {
    expect(this.digest.glossary).to.be.a('object')
    expect(this.digest.glossary).to.not.be.an('array')
  })

  it('should not be empty', function(){
    expect(Object.keys(this.digest.glossary).length).to.be.gt(0)
  })

  it('should have valid terms', function(){
    this.validateRecords('glossary', (termId, term, logError) => {
      // if (!this.validTermId(termId)){
      //   logError('invalid term id')
      // }
    })
  })

})
