const Path = require('path')
const fs = require('fs-extra')
const lexer = require('marked').lexer
const { lstatSync } = require('fs');
const { join } = require('path')

const APP_ROOT = Path.resolve(__dirname, '..')

const values = object =>
  Object.keys(object).map(key => object[key])

const isDirectory = source => {
  return lstatSync(source.fullPath).isDirectory()
}

const getDirectoriesSync = path => {
  return readdir(path)
  .then(files => {
    return files.map(name => ({fullPath: join((APP_ROOT+ path), name),
                               name}))
      .filter(isDirectory)
      .map(file => file.name);
  });
};

const readdir = path =>
  fs.readdir(APP_ROOT+path).then(files =>
    files.filter(file => file[0] !== '.')
  )

const readFile = path =>
  fs.readFile(APP_ROOT+path)

const readMarkdownFile = path =>
  readFile(path)
    .then(file => lexer(file.toString()))

const nameToId = name =>
  name
    .replace(/^\s*/,'')
    .replace(/\s*$/,'')
    .replace(/[\/ #]/g, '-')
    .replace(/`/g, '')

const rawTextToName = rawText =>
  rawText
    .replace(/^\s*\[\s+\]\s+/, '')
    .replace(/^\s*/,'')
    .replace(/\s*$/,'')

const indexById = terms => {
  return terms.reduce((index, term) => {
    index[term.id] = term
    return index
  }, {})
}

const noExtension = module => !module.includes('.')

const extractListFromSection = (document, text, depth) => {
  // console.log('===== extractListFromSection ====', text, depth)
  let
    items = [],
    withinSection = false,
    withinListItem = false,
    listItemText = ''

  document.forEach(token => {
    // console.log(withinSection, withinListItem, token)

    if (
      token.type === 'heading' &&
      (depth && token.depth <= depth)
    ) withinSection = false

    if (
      token.type === 'heading' &&
      ( depth !== undefined && token.depth === depth ) &&
      token.text === text
    ) withinSection = true

    if (!withinSection) return

    if (token.type === 'list_item_start') withinListItem = true

    if (token.type === 'list_item_end') {
      withinListItem = false
      items.push(listItemText)
      listItemText = ''
    }

    if (!withinListItem) return

    if (token.type === 'space') listItemText += ' '
    if (token.type === 'text') listItemText += token.text
  })
  // console.log('ITEMSs =====', items)
  return items
}


 module.exports = {
  APP_ROOT,
  values,
  readdir,
  readFile,
  readMarkdownFile,
  rawTextToName,
  nameToId,
  extractListFromSection,
  indexById,
  noExtension,
  getDirectoriesSync
 }
