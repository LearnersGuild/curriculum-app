const util = require('util')
const knex = require('./knex')

const logCheck = ({user_id, label, checked, referrer}) =>
  knex
    .insert({
      occurred_at: knex.fn.now(),
      user_id,
      label,
      checked,
      referrer
    })
    .into('check_log')

const setCheck = ({user_id, label, checked, referrer}) =>
  logCheck({user_id, label, checked, referrer})
    .then(() => {
      const record = {
        updated_at: knex.fn.now(),
        user_id,
        label,
        checked,
      }
      const insert = knex.insert(record).into('checks')
      const update = knex.update(record).into('checks')
      const query = util.format('%s ON CONFLICT (user_id, label) DO UPDATE SET %s',
        insert.toString(),
        update.toString().replace(/^update\s.*\sset\s/i, ''));
      return knex.raw(query)
    })


module.exports = {
  setCheck,
}


