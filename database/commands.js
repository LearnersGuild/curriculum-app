const util = require('util')
const knex = require('./knex')

const setCheck = ({user_id, label, checked}) => {
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
  console.log('setCheck', query.toString())
  return knex.raw(query)
}

module.exports = {
  setCheck,
}


