const loadDigest = () => {
  if (digest) return Promise.resolve(digest)
  return new Promise((resolve, reject) => {
    $.getJSON('/digest.json', _digest => {
      digest = _digest
      console.info('DIGEST LOADED', digest)
      resolve(digest)
    })
  })
}

module.exports = {
  loadDigest,
}


const waitForDOMReady = (x) =>
  new Promise((resolve, reject) => {
    $(() => {
      console.info('DOM READY', x)
      resolve(x)
    })
  })
