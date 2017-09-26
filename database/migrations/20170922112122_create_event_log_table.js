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
      databaseUtils.migrateCheckLogs(knex)
    ),

    knex.schema.createTable('skill_checks', table => {
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      table.string('user_id').notNullable()
      table.string('label').notNullable()
    })
    .then(tables =>
      databaseUtils.migrateSkillChecks(knex)
    ),

    ])


exports.down = knex =>
  Promise.all([
    knex.schema.dropTable('event_logs'),
    knex.schema.dropTable('skill_checks'),
  ])


// NOTES TODO 

/*
event_logs
  currured_at
  user_id
  type
  metadata
    label
    checked


// if a record exists in this table for a given (label & user_id) then this skill is checked for that user
skill_checks
  updated_at
  user_id
  label



rename API endpoint from
/api/checks/set    -> /api/skill-checks/set
/api/checks/status -> /api/skill-checks/status
*/