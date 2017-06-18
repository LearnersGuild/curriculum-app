exports.up = knex =>
  Promise.all([

    knex.schema.createTable('checks', table => {
      table.timestamp('updated_at')
      table.string('user_id').notNullable().index()
      table.string('label').notNullable().index()
      table.boolean('checked').notNullable()
      table.unique(['user_id', 'label'])
    }),

    knex.schema.createTable('check_log', table => {
      table.timestamp('occurred_at').defaultTo(knex.fn.now())
      table.string('user_id').notNullable()
      table.string('label').notNullable()
      table.boolean('checked').notNullable()
      table.string('referrer').notNullable()
    }),

  ])

exports.down = knex =>
  Promise.all([
    knex.schema.dropTable('checks'),
    knex.schema.dropTable('check_log'),
  ])
