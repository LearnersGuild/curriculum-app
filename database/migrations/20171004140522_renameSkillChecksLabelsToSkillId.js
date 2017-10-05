exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.table('skill_checks', function (table) {
      table.renameColumn('label', 'skill_id')
    }).then(_ =>
      knex.schema.table('skill_checks', function (table) {
        table.unique(['user_id', 'skill_id'])
      })
    ),
    knex.raw(`
      UPDATE
        "event_logs"
      SET
        "metadata" = "metadata" - 'label' || jsonb_build_object('skill_id', "metadata"->'label')
      WHERE
        "type" = 'skill_check'
    `)
  ])

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.table('skill_checks', function (table) {
      table.renameColumn('skill_id', 'label')
    }),
    knex.raw(`
      UPDATE
        "event_logs"
      SET
        "metadata" = "metadata" - 'skill_id' || jsonb_build_object('label', "metadata"->'skill_id')
      WHERE
        "type" = 'skill_check'
    `)
  ])
