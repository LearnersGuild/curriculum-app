const { getDigest } = require('../../digest')

module.exports = app => {

  app.use((request, response, next) => {
    getDigest()
      .then(addPathsToDigest)
      .then(digest => {
        response.digest = digest
        response.locals.digest = digest
      })
      .then(next)
      .catch(next)
  })

  app.get('/digest.json', (request, response, next) => {
    response.json(response.digest)
  })

}


const addPathsToDigest = digest => {

  const generatePaths = prop => {
    Object.values(digest[prop]).forEach(member => {
      member.path = `/${prop}/${member.id}`
    })
  }

  generatePaths('phases')
  generatePaths('challenges')
  generatePaths('skills')
  generatePaths('modules')

  return digest
}
