const loadDigest = () => {
  if (loadDigest.digest) return Promise.resolve(loadDigest.digest)
  return new Promise((resolve, reject) => {
    $.getJSON('/digest.json', digest => {
      console.info('DIGEST LOADED', digest)
      loadDigest.digest = digest
      resolve(digest)
    })
  })
}

module.exports = {
  loadDigest
}
