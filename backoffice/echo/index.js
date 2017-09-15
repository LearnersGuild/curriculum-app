const echoGraphQLFetch = require('./graphQLFetch')

class EchoClient {
  constructor(lgJWT){
    this.lgJWT = lgJWT
  }

  query(query, variables={}){
    return echoGraphQLFetch({query, variables}, this.lgJWT)
  }

  getPhasesForUsers(users){
    const identifiers = JSON.stringify(users.map(l => l.handle))
    return this.query(`
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
        const learner = users.find(learner => learner.handle === user.handle)
        if (!learner) return
        if (user.phase) learner.phase = user.phase.number
      })
      return users
    })
  }
}

module.exports = { EchoClient }
