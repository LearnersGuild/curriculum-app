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
      response.data.findUsers.forEach(echoUser => {
        const user = users.find(user => user.handle === echoUser.handle)
        if (!user) return
        if (echoUser.phase) user.phase = echoUser.phase.number
        user._echoPhase = echoUser.phase ? echoUser.phase.number : null
      })
      return users
    })
  }
}

module.exports = { EchoClient }
