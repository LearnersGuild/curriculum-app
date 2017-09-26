const util = require('util')
const knex = require('./knex')

const logSkillCheck = ({user_id, label, checked, referrer}) =>
  knex
    .insert({
      occurred_at: knex.fn.now(),
      type: 'skill_check',
      user_id,
      metadata: {
        label,
        checked,
        referrer,
      }
    })
    .into('event_logs')

const setSkillCheck = ({user_id, label, checked, referrer}) =>
  logSkillCheck({user_id, label, checked, referrer})
    .then(() => {
      if (checked) {
        return knex
          .insert({user_id, label, occurred_at: knex.fn.now()})
          .into('skill_checks')
      } else {
          return knex('skill_checks')
            .where('user_id', '=', user_id)
            .andWhere('label', '=', label)
            .del()
      }
    })

module.exports = {
  setSkillCheck,
}
