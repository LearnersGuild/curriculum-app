process.env.NODE_ENV = 'test'
// process.env.LOG_SQL_QUERIES = '0'
process.env.CURRICULUM_BASE_URL = 'http://curriculum.learnersguild.test'
process.env.IDM_BASE_URL = 'http://idm.learnersguild.test'
process.env.ECHO_BASE_URL = 'http://echo.learnersguild.test'
process.env.DATABASE_URL = 'postgres://localhost:5432/lg-curriculum-test'
process.env.HUBSPOT_API_KEY = 'FAKE_HUBSPOST_API_KEY'
process.env.JWT_PUBLIC_KEY = 'FAKE_PUBLIC_KEY'

const fs = require('fs-extra')
const APP_ROOT = __dirname
const chaiHttp = require('chai-http')
global.chai = require('chai')
global.AssertionError = chai.AssertionError
global.expect = chai.expect
chai.use(chaiHttp)
require('./test/helpers')
require('./test/haveDuplicates')
const { resetDatabase } = require('./test/databaseHelpers')

// Global before each
beforeEach(function(){
  // reset the webserver agent (clear cookies)
  this.webServerSession = function(){
    return this._webServerSession || (
      this._webServerSession = createWebServerSession()
    )
  }

  'get post put patch delete'.split(' ').forEach(method => {
    this[method] = function(...args){
      return this.webServerSession()[method](...args)
    }
  })

  return resetDatabase()
})


global.readFile = path =>
  fs.readFile(APP_ROOT+path)

global.expectFilesToExists = function(paths){
  return Promise.all(
    paths.map(path =>
      fs.access(`${APP_ROOT}/${path}`).then(
        good => true,
        bad => false,
      )
    )
  ).then(results => {
    const missingPaths = paths.filter((path, index) => !results[index])
    if (missingPaths.length === 0) return
    throw new AssertionError(
      "expected the following files to exist:\n  "+
      missingPaths.join("\n  ")
    )
  })
}
