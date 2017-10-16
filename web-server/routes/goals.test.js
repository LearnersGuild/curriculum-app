'use strict'
const goalsById = require('../../goals/goals')
const goals = Object.values(goalsById)

describe('/api/goals/index.json', function(){
  it('should render all goals', function(){
    return this
      .get('/api/goals/index.json')
      .then(response => {
        expect(response).to.have.status(200)
        expect(response.body).to.deep.equal({ goals })
      });
  })
})

describe('/api/goals/:goalId.json', function(){
  context('when the goal id is valid', function(){
    let goalId
    beforeEach(function(){
      goalId = Object.keys(goalsById)[0]
      expect(goalId).to.match(/^\d+$/)
    })

    it('should render the goal', function(){
      return this
        .get(`/api/goals/${goalId}.json`)
        .then(response => {
          expect(response).to.have.status(200)
          expect(response.body).to.deep.equal(goalsById[goalId])
        })
    })
  })

  context('when the goal id is invalid', function(){
    let goalId
    beforeEach(function(){
      goalId = '3746374'
    })

    it('should render a 404', function(){
      return this
        .get(`/api/goals/${goalId}.json`)
        .then(
          response => {
            throw new Error('expected response to render 404')
          },
          error => {
            expect(error.response).to.have.status(404)
            expect(error.response.body).to.deep.equal({
              error: `Could not find goal with id: ${goalId}`
            })
          }
        )
    })
  })
})
