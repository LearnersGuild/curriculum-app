const databaseUtils = require('../utils')

exports.up = knex =>
  Promise.all([
    knex.schema.createTable('event_logs', table => {
      table.timestamp('occurred_at').defaultTo(knex.fn.now())
      table.string('user_id').notNullable()
      table.string('type').notNullable()
      table.jsonb('metadata').notNullable()
    })
    .then(tables =>
      migrateCheckLogs(knex)
    ),

    knex.schema.createTable('skill_checks', table => {
      table.timestamp('occurred_at').defaultTo(knex.fn.now())
      table.string('user_id').notNullable()
      table.string('label').notNullable()
    })
    .then(tables =>
      migrateSkillChecks(knex)
    ),
  ])


exports.down = knex =>
  Promise.all([
    knex.schema.dropTable('event_logs'),
    knex.schema.dropTable('skill_checks'),
  ])


const migrateCheckLogs = (knex) => {
  return knex
    .select('*')
    .from('check_log')
    .then(checkLogs => {
      const inserts = []
      checkLogs.forEach(checkLog => {
        const label = nameToId(checkLog.label)
        inserts.push(
          knex
            .insert({
              occurred_at: checkLog.occurred_at,
              user_id: checkLog.user_id,
              type: 'skill_check',
              metadata: {
                label: label,
                checked: checkLog.checked,
                referrer: checkLog.referrer
              }
            })
            .into('event_logs')
        )
      })
      return Promise.all(inserts)
    })
}

const migrateSkillChecks = (knex) => {
  return knex
    .select('*')
    .from('checks')
    .then(checks => {
      const inserts = []
      checks.filter(element => element.checked)
        .forEach(check => {
          const label = nameToId(check.label)
          inserts.push(
            knex
              .insert({
                occurred_at: check.updated_at,
                user_id: check.user_id,
                label: label
              })
              .into('skill_checks')
          )
        })
      return Promise.all(inserts)
    })
}
