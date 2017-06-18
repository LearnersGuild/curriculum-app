const knex= require('./knex')

const getChecks = ({user_id, labels}) =>
  knex
    .select('*')
    .from('checks')
    .where({user_id})
    .whereIn('label', labels)

module.exports = {
  getChecks,
}
