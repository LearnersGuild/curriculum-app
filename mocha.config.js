const chaiHttp = require('chai-http')
const webServer = require('./web-server')

global.chai = require('chai')
global.expect = chai.expect

chai.use(chaiHttp)

global.webServer = () =>
  chai.request(webServer)



chai.Assertion.addMethod('haveDuplicates', function() {
  const array = Array.from(this._obj)
  expect(array).to.be.an.instanceof(Array)

  const dups = []
  array.forEach((member, index) => {
    if (array.lastIndexOf(member) !== index){
      dups.push(member)
    }
  })

  this.assert(
    dups.length !== 0,
    "expected #{this} to have duplicates",
    "expected #{this} to not have duplicates",
    [],  // expected
    dups // actual
  );
})
