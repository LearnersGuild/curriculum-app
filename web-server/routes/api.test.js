'use strict'

describe('POST /api/skills/checked', function(){

  whenNotLoggedIn(function(){
    it('should redirect to login', function(){
      return this
        .post(`/api/skills/checked`)
        .expectToRedirectToLogin()
    })
  })

  whenLoggedIn(function(){
    it.only('should render an array of skills ids as JSON', function(){
      return this
        .post(`/api/skills/checked`)
        .catch(error => {
          console.error(error)
          throw error
        })
        .then(response => {
          expect(response.status).to.equal(200)
          expect(response.type).to.equal('application/json')
          const payload = JSON.parse(response.text)
          expect(payload).to.equal({})
        })
    })
  })

})

