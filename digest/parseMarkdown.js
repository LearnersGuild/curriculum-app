module.exports = require('marked').lexer


module.exports.extractListFromSection = (document, text, depth) => {
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
