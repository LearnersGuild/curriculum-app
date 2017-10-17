const chai = require('chai')
const webServer = require('../web-server')
const WebServerSession = require('./WebServerSession')

let webServerAgent = null
global.createWebServerSession = () =>
  new WebServerSession(chai.request.agent(webServer))

global.generateFakeUser = () => (
  {
    id: 'FAKE_USER_ID',
    handle: 'FakeUser',
    roles: ['learner'],
  }
)

global.whenNotLoggedIn = function(spec){
  context('when not logged in', function(){
    beforeEach(function(){
      this.currentUser = null
    })
    spec()
  })
}

global.whenLoggedIn = function(spec){
  context('when logged in', function(){
    beforeEach(function(){
      this.currentUser = this.currentUser || generateFakeUser()
      return this.webServerSession().loginAs(this.currentUser)
    })
    spec()
  })
}

