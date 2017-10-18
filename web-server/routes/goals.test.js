'use strict'
const goalsById = require('../../goals/goals')
const goals = Object.values(goalsById)

describe('/api/goals', function(){
  describe('/index.json', function(){
    it('should render all goals', function(){
      return this
        .get('/api/goals/index.json')
        .then(response => {
          expect(response).to.have.status(200)
          const expectedGoals = goals.map(goalToGoalWithURL)
          expect(response.body).to.deep.equal({ goals: expectedGoals })
        });
    })
  })

  describe('/:goalId.json', function(){
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
            expect(response.body).to.deep.equal(
              goalToGoalWithURL(goalsById[goalId])
            )
          })
      })
    })

    context('when the goal id is invalid', function(){
      it('should render a 404', function(){
        return this
          .get(`/api/goals/3746374.json`)
          .then(
            response => {
              throw new Error('expected response to render 404')
            },
            error => {
              expect(error.response).to.have.status(404)
              expect(error.response.body).to.deep.equal({
                error: `Could not find goal with id: 3746374`
              })
            }
          )
      })
    })
  })

})

const goalToGoalWithURL = _goal => {
  const goal = Object.assign({}, _goal)
  goal.url = `${process.env.CURRICULUM_BASE_URL}${goal.path}`
  delete goal.path
  return goal
}
