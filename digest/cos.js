const utils = require('./utils')

module.exports = () =>
  loadCOSWorkshops()
    .then(convertCOSWorkshopDirectoryNamesCOSWorkshop)
    // .then(extractCOSWorkshopDetails)
    .then(indexById)

const loadCOSWorkshops = () =>
  utils.readdir('/cos/workshops')

const convertCOSWorkshopDirectoryNamesCOSWorkshop = COSWorkshopDirectoryNames =>
  COSWorkshopDirectoryNames
    .filter(noExtension)
    .sort()
    .map(directoryName => ({
      directoryName,
      id: directoryName,
      name: directoryName.replace(/-/g, ' '),
      path: `/cos/workshops/${directoryName}`,
    }))

const indexById = COSWorkshops => {
  return COSWorkshops.reduce((map, COSWorkshop) => {
    map[COSWorkshop.id] = COSWorkshop
    return map
  }, {})
}

const noExtension = module => !module.includes('.')
