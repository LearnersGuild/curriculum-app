const fetch = require('isomorphic-fetch')

// coppied from @learnersguild/idm-jwt-auth/lib/utils
// and modified for Echo
module.exports = function(graphQLParams, token = null) {
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
