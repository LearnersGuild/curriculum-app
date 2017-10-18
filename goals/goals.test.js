describe('goals', function(){
  it('should contain valid goals', function(){
    return readFile('/goals/goals.json')
      .then(json => JSON.parse(json))
      .then(goals => {

        Object.entries(goals).forEach(([goalId, goal]) => {
          expect(goalId).to.be.a('string')
          expect(goalId).to.match(/^\d+$/)
          expect(goal.goal_id+'').to.eql(goalId)
        })

        return expectFilesToExists(
          Object.values(goals).map(goal => goal.path+'/README.md')
        )
      })
  })
})
