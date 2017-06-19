const Path = require('path')
const fs = require('fs-extra')
const lexer = require('marked').lexer

const APP_ROOT = Path.resolve(__dirname, '..')


const readdir = path =>
  fs.readdir(APP_ROOT+path)

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

const extractListFromSection = (document, text, depth) => {
  // console.log('===== extractListFromSection ====', text, depth)
  let
    items = [],
    withinSection = false,
    withinListItem = false,
    listItemText = ''

  document.forEach(token => {
    // console.log(withinSection, withinListItem, token)

    if (token.type === 'heading') withinSection = false

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
  readdir,
  readFile,
  readMarkdownFile,
  rawTextToName,
  nameToId,
  extractListFromSection,
 }
