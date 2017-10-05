const util = require('util')
const knex = require('./knex')

const logSkillCheck = ({userId, skillId, checked, referrer}) =>
  knex
    .insert({
      occurred_at: knex.fn.now(),
      type: 'skill_check',
      user_id: userId,
      metadata: {
        skill_d: skillId,
        checked,
        referrer,
      }
    })
    .into('event_logs')

const checkSkill = (userId, skillId, referrer) =>
  Promise.all([
    logSkillCheck({userId, skillId, referrer, checked: true}),
    knex('skill_checks')
      .insert({
        user_id: userId,
        skill_id: skillId,
        updated_at: knex.fn.now()
      })
  ])

const uncheckSkill = (userId, skillId, referrer) =>
  Promise.all([
    logSkillCheck({userId, skillId, referrer, checked: false}),
    knex('skill_checks')
      .where({
        user_id: userId,
        skill_id: skillId,
      })
      .del()
  ])


module.exports = {
  checkSkill,
  uncheckSkill,
}
