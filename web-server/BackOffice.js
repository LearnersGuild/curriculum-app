const { idmGraphQLFetch } = require('@learnersguild/idm-jwt-auth/lib/utils')

module.exports = class BackOffice {
  constructor(lgJWT){
    this.lgJWT = lgJWT
  }

  queryIdm(query, variables={}){
    return idmGraphQLFetch({query, variables}, this.lgJWT)
  }

  queryEcho(query, variables={}){
    return echoGraphQLFetch({query, variables}, this.lgJWT)
  }

  getUser(handle){
    return this.queryIdm(`
      query {
        findUsers(identifiers: ["${handle}"]) {
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
    `).then(response => response.data.findUsers[0])
  }

  getPhasesForLearners(learners){
    const identifiers = JSON.stringify(learners.map(l => l.handle))
    return this.queryEcho(`
      query{
        findUsers(identifiers: ${identifiers}){
          handle
          phase {
            number
          }
        }
      }
    `).then(response => {
      response.data.findUsers.forEach(user => {
        const learner = learners.find(learner => learner.handle === user.handle)
        if (!learner) return
        if (user.phase) learner.phase = user.phase.number
      })
      return learners
    })
  }

  getAllLearners(){
    return this.queryIdm(`
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
    .then(learners => this.getPhasesForLearners(learners))
  }

  getActiveLearners(){
    return this.getAllLearners()
      .then(getAllLearners =>
        getAllLearners
          .filter(learner => learner.active)
      )
  }

  getActiveLearnersForPhase(phaseNumber){
    return this.getActiveLearners()
      .then(learners =>
        learners
          .filter(learner => learner.phase === phaseNumber)
      )
  }
}





// coppied from @learnersguild/idm-jwt-auth/lib/utils
// and modified for Echo
const echoGraphQLFetch = function(graphQLParams, token = null) {
  if (!process.env.ECHO_BASE_URL) {
    throw new Error('ECHO_BASE_URL must be set in environment')
  }
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'LearnersGuild-Skip-Update-User-Middleware': 1,
    },
    body: JSON.stringify(graphQLParams),
  }
  if (token) {
    options.headers = Object.assign(options.headers, {
      Authorization: `Bearer ${token}`,
    })
  }

  return fetch(`${process.env.ECHO_BASE_URL}/graphql`, options)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`GraphQL ERROR: ${resp.statusText}`)
      }
      return resp.json()
    })
    .then(graphQLResponse => {
      if (graphQLResponse.errors && graphQLResponse.errors.length) {
        const allErrors = graphQLResponse.errors.map(err => {
          return err.message
        }).join('\n')
        throw new Error(allErrors)
      }
      return graphQLResponse
    })
}
