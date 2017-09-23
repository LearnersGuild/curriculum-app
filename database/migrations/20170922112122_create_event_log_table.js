exports.up = knex =>
  Promise.all([
    knex.schema.createTable('event_log', table => {
      table.timestamp('occurred_at').defaultTo(knex.fn.now())
      table.string('user_id').notNullable().index()
      table.jsonb('metadata').notNullable()
    })
  ])


exports.down = knex =>
  knex.schema.dropTable('event_log')
