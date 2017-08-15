const glossary = require('.')
const glossaryJSON = require('./index.json')

describe('glossary', function(){

  it('should be sorted', function(){
    const keys = Object.keys(glossaryJSON)
    const sortedKeys = Object.keys(glossaryJSON)
      .sort((a, b) => {
        a = a.toLowerCase()
        b = b.toLowerCase()
        return a > b ? 1 : b > a ? -1 : 0
      })
    try{
      expect(keys).to.eql(sortedKeys)
    }catch(error){
      if (error.name === 'AssertionError'){
        error = new Error('The glossary is not sorted. Run bin/sort-glossary') 
      }
      throw error
    }
  })

})