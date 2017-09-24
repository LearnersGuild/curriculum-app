const databaseUtils = require('../utils')

exports.up = knex =>
  Promise.all([
    knex.schema.createTable('event_log', table => {
      table.timestamp('occurred_at').defaultTo(knex.fn.now())
      table.string('user_id').notNullable().index()
      table.jsonb('metadata').notNullable()
    }),

    knex.schema.createTable('event_logs', table => {
      table.timestamp('occurred_at').defaultTo(knex.fn.now())
      table.string('user_id').notNullable()
      table.string('type').notNullable()
    }),
  ])
  .then(tables =>
    databaseUtils.migrateCheckLogs(knex)
  )


exports.down = knex =>
  Promise.all([
    knex.schema.dropTable('event_log'),
    knex.schema.dropTable('event_logs'),
  ])
