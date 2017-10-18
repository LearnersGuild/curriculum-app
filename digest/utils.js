const Path = require('path')
const fs = require('fs-extra')
const renderMarkdown = require('marked')
const lexer = renderMarkdown.lexer

const APP_ROOT = Path.resolve(__dirname, '..')

const promiseMap = function(map){
  const keys = Object.keys(map)
  const promises = keys.map(key => map[key])
  return Promise.all(promises).then(values => {
    const map = {}
    keys.forEach((key, index) => {
      map[key] = values[index]
    })
    return map
  })
}

const convertIdsToObjects = ids =>
  ids.map(id => ({id}))

const mapToObjectBy = property =>
  members => {
    const map = {}
    members.forEach(member => {
      map[member[property]] = member
    })
    return map
  }

const nameToId = name => {
  if (typeof name !== 'string' || name.length < 5)
    throw new Error('nameToId was given shit: '+name)
  return String(name)
    .trim()
    .replace(' & ', ' and ')
    .replace(/['":`\[\]\(\)]+/g, '')
    .replace(/[^\w\d]+/g, '-')
    .replace(/(^-+|-+$)/g, '')
}


const readFile = path =>
  fs.readFile(APP_ROOT+path)

const readdir = path =>
  fs.readdir(APP_ROOT+path).then(files =>
    files.filter(file => file[0] !== '.')
  )

/*
 * Usage:
 *   readDirectoriesWithREADMEs('/modules')
 *
 * Returns:
 *   array of objects like:
 *     {
 *       id: <directory name>,
 *       readme: <contents of readme file>,
 *     }
 */
const readDirectoriesWithREADMEs = path =>
  readdir(path)
  .then(files => files.sort())
  .then(convertIdsToObjects)
  .then(tryLoadingREADME(path))
  .then(directories =>
    directories.filter(directory => directory.READMEMarkdown)
  )

const tryLoadingREADME = path =>
  directories =>
    Promise.all(
      directories.map(directory =>
        readMarkdownFile(Path.join(path, directory.id, 'README.md'))
        .then(
          READMEMarkdown => {
            directory.READMEMarkdown = READMEMarkdown
            directory.name = getHeadingFromMarkdown(READMEMarkdown)
            // directory.path = Path.join(path, directory.id)
            directory.READMEpath = Path.join(path, directory.id, 'README.md')
            return directory
          },
          error => { return directory },
        )
      )
    )


const removeREADMEMarkdown = objects => {
  objects.forEach(object => {
    delete object.READMEMarkdown
  })
  return objects
}

const getHeadingFromMarkdown = markdown =>
  (markdown.find(token => token.type === 'heading') || {}).text

const readMarkdownFile = path =>
  readFile(path)
    .then(file => lexer(file.toString()))

const extractSkillsFromREADMEMarkdowns = objects => {
  objects.forEach(object => {
    const skills = extractListFromMarkdownSection(
      object.READMEMarkdown,
      'Skills',
      2,
    )
    object.skills = skills.map(nameToId)
  })
  return objects
}

const extractListFromMarkdownSection = (document, text, depth) => {
  // console.log('===== extractListFromMarkdownSection ====', text, depth)
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
      items.push(listItemText.trim())
      listItemText = ''
    }

    if (!withinListItem) return

    if (token.type === 'space') listItemText += ' '
    if (token.type === 'text') listItemText += token.text
  })
  return items
}

const renderNameAsHTML = objects => {
  objects.forEach(object => {
    object.nameAsHTML = renderMarkdown(object.name)
      .replace(/^<p>/, '')
      .replace(/<\/p>\n?$/, '')
  })
  return objects
}


module.exports = {
  APP_ROOT,
  promiseMap,
  readDirectoriesWithREADMEs,
  extractListFromMarkdownSection,
  extractSkillsFromREADMEMarkdowns,
  mapToObjectBy,
  nameToId,
  removeREADMEMarkdown,
  getHeadingFromMarkdown,
  renderNameAsHTML,
}
