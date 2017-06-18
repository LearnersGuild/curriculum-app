const knex = require('./knex')

const getChecks = ({user_id, labels}) => {
  let query = knex
    .select('*')
    .from('checks')
    .where({user_id})

  if (labels && labels.length > 0)
    query = query.whereIn('label', labels)

  return query.then(hashChecksByLabel)
}

const hashChecksByLabel = checks => {
  const checkedMap = {}
  checks.forEach(check => {
    checkedMap[check.label] = check.checked
  })
  return checkedMap
}

module.exports = {
  getChecks,
}


