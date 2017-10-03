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

const logStatusUpdate = ({user_id, status}) =>
  knex
    .insert({
      occurred_at: knex.fn.now(),
      type: 'phase_4_status_update',
      user_id,
      metadata: {status},
    })
    .into('event_logs')


const setStatus = ({user_id, status}) =>
  logStatusUpdate({user_id, status})
    .then(() => {
      const insert = knex('phase_4_status').insert({
        user_id, status, updated_at: knex.fn.now()
      }).toString()

      const update = knex('phase_4_status')
        .update({status})
        .where('phase_4_status.user_id', user_id)

      const query = util.format(
        '%s ON CONFLICT (user_id) DO UPDATE SET %s',
        insert.toString(),
        update.toString().replace(/^update\s.*\sset\s/i, '')
      )
      return knex.raw(query)
    })

module.exports = {
  setSkillCheck,
  setStatus
}
