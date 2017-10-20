require('./environment')
const chaiHttp = require('chai-http')
global.chai = require('chai')
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
