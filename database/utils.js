const util = require('util')
const nameToId = require('../digest/utils').nameToId

const migrateSkillsDiff = (knex, diffText) => {

  const changes = extractChangesFromDiff(diffText)

  return Promise.all(
    changes.map(([oldSkill, newSkills]) =>
      migrateRenamedSkills(knex, oldSkill, newSkills)
    )
  )

}

module.exports = {
  migrateSkillsDiff,
}


const extractChangesFromDiff = diffText => {
  const changes = {}

  const skillChanges = diffText.split("\n\n").forEach(change => {
    let newSkills = change.split("\n")
    let oldSkill = newSkills.shift()
    console.assert(oldSkill.match(/^-- /), 'old skill should start with "-- " >>> '+JSON.stringify(oldSkill)+'  <<<')
    oldSkill = oldSkill.replace(/^-- /, '')

    if (newSkills[newSkills.length-1] === "") newSkills.pop()

    newSkills = newSkills.map(newSkill => {
      console.assert(newSkill.match(/^\+- /), 'new skill should start with "+- " >>> '+JSON.stringify(newSkill)+'  <<<')
      return newSkill.replace(/^\+- /, '')
    })
    console.assert(!(oldSkill in changes), 'duplicate old skill >>> '+JSON.stringify(oldSkill)+'  <<<')
    changes[oldSkill] = newSkills
  })

  return Object.keys(changes).map(oldSkill => [oldSkill, changes[oldSkill]])
}

const migrateRenamedSkills = (knex, oldSkill, newSkills) => {
  return Promise.all([
    insertRenamedChecksForRenamedSkill(knex, oldSkill, newSkills),
    insertRenamedCheckLogsForRenamedSkill(knex, oldSkill, newSkills),
  ])
}

const insertRenamedChecksForRenamedSkill = (knex, oldSkill, newSkills) => {
  return knex
    .select('*')
    .from('checks')
    .where('label', nameToId(oldSkill))
    .then(checks => {
      const inserts = []
      newSkills.forEach(newSkill => {
        const label = nameToId(newSkill)
        checks.forEach(check => {
          const record = {
            label: label,
            updated_at: check.updated_at,
            user_id: check.user_id,
            checked: check.checked,
          }
          const insert = knex.insert(record).into('checks')
          const update = knex.update(record).into('checks')
          const query = util.format('%s ON CONFLICT (user_id, label) DO UPDATE SET %s',
            insert.toString(),
            update.toString().replace(/^update\s.*\sset\s/i, ''))
          inserts.push(knex.raw(query))
        })
      })
      return Promise.all(inserts)
    })
}

const insertRenamedCheckLogsForRenamedSkill = (knex, oldSkill, newSkills) => {
  return knex
    .select('*')
    .from('check_log')
    .where('label', nameToId(oldSkill))
    .then(checkLogs => {
      const inserts = []
      newSkills.forEach(newSkill => {
        const label = nameToId(newSkill)
        checkLogs.forEach(check => {
          inserts.push(
            knex
              .insert({
                label: label,
                occurred_at: check.occurred_at,
                user_id: check.user_id,
                checked: check.checked,
                referrer: check.referrer,
              })
              .into('check_log')
          )
        })
      })
      return Promise.all(inserts)
    })
}
