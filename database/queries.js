const knex= require('./knex')

const getChecks = ({user_id, labels}) =>
  knex
    .select('*')
    .from('checks')

module.exports = {
  getChecks,
}
