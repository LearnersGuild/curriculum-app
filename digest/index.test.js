const digest = require('.')

describe('digest', function(){

  it('should be a function', function(){
    expect(digest).to.be.a('function')
  })

  it('should return a promise', function(){
    expect(digest()).to.be.an.instanceof(Promise)
  })

  describe('results', function(){
    before(function(){
      return digest().then(digest => {
        this.digest = digest
      })
    })

    it('should return an object', function(){
      expect(this.digest).to.be.an('object')
    })

    it('should have keys', function(){
      expect(Object.keys(this.digest)).to.eql([
        "modules",
        "phases",
        "glossary",
        "skillContexts",
        "phaseOrder",
        "skills",
        "report",
      ])
    })

    describe('.glossary', function(){
      before(function(){
        return digest().then(digest => {
          this.digest = digest
        })
      })
      it('should be an object', function() {
        expect(this.digest.glossary).to.be.a('object')
        expect(this.digest.glossary).to.not.be.an('array')
      })
      it('should contain terms', function(){
        expect(Object.keys(this.digest.glossary).length).to.be.gt(0)
      })

      describe('[term]', function(){

        let term
        beforeEach(function(){
          const termId = Object.keys(this.digest.glossary)[0]
          term = this.digest.glossary[termId]
        })

        it('should be an object', function(){
          expect(term).to.be.a('object')
        })

        it('should have an id', function(){
          expect(term.id).to.be.a('string')
        })

        it('should have a value', function(){
          expect(term.value).to.be.a('string')
        })

        it('should have a path', function(){
          expect(term.path).to.be.a('string')
        })
      })
    })

    describe('.skills', function(){
      it('should be an object with keys', function(){
        const skillIds = Object.keys(this.digest.skills)
        // expect(skillIds).to.eql([])
      })
    })

    describe('.phases', function(){
      it('should be an object with keys', function(){
        const phases = Object.keys(this.digest.phases)
        expect(phases).to.eql(['area 45', 'foundations', 'practice'])
      })

      it('should each have skills', function(){
        Object.keys(this.digest.phases).forEach(phaseNumber => {
          const phase = this.digest.phases[phaseNumber]
          expect(phase.skills).to.be.an('Array')
          expect(phase.skills).to.not.haveDuplicates()
        })
      })

      it('should link to existing modules', function(){
        const allModuleIds = Object.values(this.digest.modules)
          .map(module => module.id)
          .sort()

        const moduleIdsInPhases = Object.values(this.digest.phases)
          .map(phase => phase.modules)
          .reduce((a, b) => a.concat(b))
          .sort()

        const missingModuleIds = moduleIdsInPhases.filter(moduleId => !allModuleIds.includes(moduleId))

        if (missingModuleIds.length > 0) {
          throw new AssertionError(
            `The following modules, referenced by phase READMEs, are missing:` +
            `\n   - ${missingModuleIds.join("\n    - ")}`
          )
        }
      })
    })
  })

})
