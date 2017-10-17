const knex = require('../database/knex')

const resetDatabase = () =>
  knex.migrate.latest()
    .then(_ =>
      Promise.all([
        knex.truncate('event_logs'),
        knex.truncate('skill_checks'),
      ])
    )

module.exports = {
  resetDatabase,
}
