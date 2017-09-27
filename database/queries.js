const knex = require('./knex')

const getChecksForUserAndLabels = ({userId, labels}) => {
  let query = knex
    .select('label')
    .from('skill_checks')
    .where({user_id: userId})

  if (labels && labels.length > 0)
    query = query.whereIn('label', labels)

  return query.then(rows => {
    const results = {}
    labels = labels || rows.map(row => row.label)
    labels.forEach(label => {
      results[label] = rows.some(row => row.label === label)
    })
    return results
  })
}

const getCheckLogsForUsers = userIds => {
  return knex
    .select('*')
    .from('event_logs')
    .where('type', 'check')
    .whereIn('user_id', userIds)
    .orderBy('occurred_at', 'asc')
    .then(checkLogs => {
      const checkLogsByUserId = {}
      userIds.forEach(userId => {
        checkLogsByUserId[userId] = checkLogs.filter(checkLog =>
          checkLog.user_id === userId
        )
      })
      return checkLogsByUserId
    })
}

module.exports = {
  getChecksForUserAndLabels,
  getCheckLogsForUsers,
}


