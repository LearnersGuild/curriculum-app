const { Test, Request } = require('chai').request

module.exports = class WebServerSession {

  constructor(agent){
    this.agent = agent
  }

  get(path, query){
    return this.agent
      .get(path)
      .set('Host', 'http://curriculum.learnersguild.test')
  }

  post(path, query){
    return this.agent
      .post(path)
      .set('Host', process.env.CURRICULUM_BASE_URL)
  }

  loginAs(user){
    return this
      .post('/__login')
      .send(user)
      .then(
        response => {
          expect(response.status).to.equal(200)
          expect(response.type).to.equal('application/json')
          expect(response.body).to.eql({ currentUser: user })
          return user
        },
        error => {
          const e = new Error('failed to login as')
          e.user = user
          e.originalError = error
          throw e
        }
      )
  }
}


Request.prototype.expectToRecirectToLogin = function(){
  return this
  .redirects(0)
  .then(
    function(response) {
      throw new Error('expected redirect to login')
    },
    function(error){
      const { response } = error
      expect(response.status).to.equal(302)
      expect(response.headers.location.split('?')[0])
        .to.equal(process.env.IDM_BASE_URL+'/sign-in')
      return this
    }
  )
}
