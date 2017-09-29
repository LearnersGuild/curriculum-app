let digest
const loadDigest = () => {
  return new Promise((resolve, reject) => {
    if (digest) return resolve(digest)
    $(() => {
      const json = $('.digest-data').text()
      if(!json) return reject(new Error('.digest-data not found or empty'))
      digest = JSON.parse(json)
      resolve(digest)
    })
  })
}

module.exports = {
  loadDigest,
}
