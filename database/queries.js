const knex = require('./knex')

const getCheckedSkills = (userIds, skillIds=[]) => {
  const singleUser = !Array.isArray(userIds)
  if (singleUser) userIds = [userIds]

  let query = knex
    .select('user_id', 'skill_id')
    .from('skill_checks')
    .whereIn('user_id', userIds)

  if (skillIds && skillIds.length > 0)
    query = query.whereIn('skill_id', skillIds)
  console.log('getCheckedSkills', query+'')
  return query.then(skillChecks => {
    const checkedSkillsByUserId = {}
    userIds.forEach(userId => {
      checkedSkillsByUserId[userId] = skillChecks
        .filter(skillCheck => skillCheck.user_id === userId)
        .map(skillCheck => skillCheck.skill_id)
    })
    return singleUser ? checkedSkillsByUserId[userIds[0]] : checkedSkillsByUserId
  })
}

const getSkillCheckLogs = userIds => {
  return knex
    .select(knex.raw(`
      user_id,
      occurred_at,
      "metadata"->'checked' as "checked",
      "metadata"->'skill_id' as "skill_id"
    `))
    .from('event_logs')
    .where('type', 'skill_check')
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

const arrayToMapBySkillId = skillChecks => {
  const skillCheckedMap = {}
  skillChecks.forEach(skillCheck => {
    skillCheckedMap[skillCheck.skill_id] = true
  })
  return skillCheckedMap
}

module.exports = {
  getCheckedSkills,
  getSkillCheckLogs,
}


