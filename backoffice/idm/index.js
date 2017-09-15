const { idmGraphQLFetch } = require('@learnersguild/idm-jwt-auth/lib/utils')
const { isUser, isUserALearner } = require('../util')

class IDMClient {
  constructor(lgJWT){
    this.lgJWT = lgJWT
  }

  query(query, variables={}){
    return idmGraphQLFetch({query, variables}, this.lgJWT)
  }

  getAllUsers(){
    return this.query(`
      query {
        findUsers {
          id
          active
          email
          emails
          handle
          profileUrl
          avatarUrl
          name
          phone
          dateOfBirth
          timezone
          roles
          createdAt
          updatedAt
        }
      }
    `)
    .then(response => response.data.findUsers)
    .then(processUsers)
  }

  getAllLearners(){
    this.getAllUsers()
    .then(users => users.filter(isUserALearner))
  }


  getActiveLearnersForPhase(phaseNumber){
    return this.getActiveLearners()
      .then(learners =>
        learners
          .filter(learner => learner.phase === phaseNumber)
      )
  }

  getLearnerByHandle(handle){
    return this.query(`
      query {
        findUsers(identifiers: [${JSON.stringify(handle)}]) {
          id
          active
          email
          emails
          handle
          profileUrl
          avatarUrl
          name
          phone
          dateOfBirth
          timezone
          roles
          createdAt
          updatedAt
        }
      }
    `)
    .then(response => response.data.findUsers[0])
    .then(processUser)
  }
}

const processUsers = users =>
  users.filter(isUser).map(processUser)

const processUser = user => {
  user.echoProfileURL = `https://echo.learnersguild.org/users/${user.handle}`
  user.githubURL = `https://github.com/${user.handle}`
  user.slackDirectMessageURL = `https://learnersguild.slack.com/messages/@${user.handle}`
  return user
}

module.exports = { IDMClient }
