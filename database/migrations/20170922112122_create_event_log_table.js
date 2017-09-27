
exports.up = knex => {
  const createEventLogsTable = () => {
    return knex.schema.createTable('event_logs', table => {
      table.string('user_id').notNullable()
      table.string('type').notNullable()
      table.timestamp('occurred_at').defaultTo(knex.fn.now())
      table.jsonb('metadata').notNullable()
    })
    .then(_ => {
      console.log('insertSkillCheckLog DONE')
    })
  }

  const migrateCheckLogs = () => {
    return knex('event_logs').insert(function() {
      this
        .select([
          'user_id',
          knex.raw(`'skill_check' as "type"`),
          'occurred_at',
          knex.raw(`
            json_build_object(
              'label', "check_log"."label",
              'checked', "check_log"."checked",
              'referrer', "check_log"."referrer"
            ) as "metadata"
          `)
        ])
        .from('check_log')
    })
    .then(_ =>
      knex.schema.dropTable('check_log')
    )
  }

  const createSkillChecksTable = () => {
    return knex.schema.createTable('skill_checks', table => {
      table.string('user_id').notNullable()
      table.string('label').notNullable()
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .then(_ => {
      console.log('insertSkillCheck DONE')
    })
  }

  const migrateSkillChecks = () => {
    return knex('skill_checks').insert(function() {
      this
        .select([
          'user_id',
          'label',
          'updated_at',
        ])
        .from('checks')
    })
    .then(_ =>
      knex.schema.dropTable('checks')
    )
  }

  return Promise.all([
    createEventLogsTable().then(migrateCheckLogs),
    createSkillChecksTable().then(migrateSkillChecks),
  ])
}

exports.down = knex =>
  Promise.all([
    knex.schema.dropTable('event_logs'),
    knex.schema.dropTable('skill_checks'),
  ])
