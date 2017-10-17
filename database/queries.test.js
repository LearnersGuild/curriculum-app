const knex = require('./knex')
const {
  getCheckedSkills,
  getSkillCheckLogs,
} = require('./queries')

const userIds = [
  '929d1bdf-d5a6-416f-a4e5-0acd48f5e578',
  'a649dc47-7484-4f45-a25b-2fed08583c16',
]

describe('database.queries', function(){

  describe('getCheckedSkills', function(){
    context('when there are no checked skills', function(){
      it('should yield empty arrays', function(){
        return getCheckedSkills(userIds)
          .then(checkedSkills => {
            expect(checkedSkills).to.eql({
              [userIds[0]]: [],
              [userIds[1]]: [],
            })
          })
      })
    })
    context('when there are checked skills', function(){
      beforeEach(function(){
        return knex
          .insert([
            {
              user_id: userIds[0],
              skill_id: 'can-click-the-left-mouse-button',
            },
            {
              user_id: userIds[0],
              skill_id: 'can-click-the-right-mouse-button',
            },
            {
              user_id: userIds[1],
              skill_id: 'can-click-the-left-mouse-button',
            },
          ])
          .into('skill_checks')
      })
      it('should yield those checked skills', function(){
        return getCheckedSkills(userIds)
          .then(checkedSkills => {
            expect(checkedSkills).to.eql({
              [userIds[0]]: [
                "can-click-the-left-mouse-button",
                "can-click-the-right-mouse-button",
              ],
              [userIds[1]]: [
                "can-click-the-left-mouse-button",
              ],
            })
          })
      })
    })
  })

  describe('getSkillCheckLogs', function(){
    it('should work')
  })

})
