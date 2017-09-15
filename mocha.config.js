process.env.NODE_ENV = 'test'
process.env.LOG_SQL_QUERIES = '1'
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/lg-curriculum-test'
process.env.HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY || 'FAKE_HUBSPOST_API_KEY'
process.env.JWT_PUBLIC_KEY = 'FAKE_PUBLIC_KEY'

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
