const knex= require('./knex')

const setCheck = ({user_id, label, checked}) =>
  knex
    .insert({
      user_id,
      label,
      checked,
    })
    .into('checks')

module.exports = {
  setCheck,
}
