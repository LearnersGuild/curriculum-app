'use strict'

describe('webServer', function(){

  whenNotLoggedIn(function(){

    describe('GET /some-bad-url', function(){
      it('should redirect login', function(){
        return this
          .get(`/some-bad-url/${Math.random()}`)
          .expectToRedirectToLogin()
      })
    })

    describe('GET /', function(){
      it('should redirect login', function(){
        return this
          .get(`/`)
          .expectToRedirectToLogin()
      })
    })

  })

  whenLoggedIn(function(){

    describe('GET /some-bad-url', function(){
      it('should render a 404', function(){
        return this
          .get(`/some-bad-url/${Math.random()}`)
          .then(
            response => {
              expect(response.status).to.equal(404)
            },
            error => {
              expect(error.response.status).to.equal(404)
            }
          )
      })
    })

    describe('GET /', function(){
      it('should render the homepage', function(){
        return this
          .get(`/`)
          .redirects(0)
          .then(
            response => {
              expect(response.status).to.equal(200)
              expect(response.text)
                .to.include('The Curriculum')
              expect(response.text)
                .to.include('Copyright © 2017 Learners Guild. All rights reserved.')
            }
          )
      })
    })

  })

})
