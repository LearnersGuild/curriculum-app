
exports.up = (knex, Promise) =>
  knex.schema.createTable('phase_4_status', table => {
    table.string('user_id').notNullable().unique()
    table.string('status').notNullable()
    table.timestamp('updated_at')
  })


exports.down = (knex, Promise) =>
  knex.schema.dropTable('phase_4_status')
