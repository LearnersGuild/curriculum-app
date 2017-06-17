const marked = require('marked')
const highlight = require('highlight.js')
// const pygmentizeBundled = require('pygmentize-bundled')
// const highlight = require('pygments').colorize;
const pygmentize = require('pygmentize-bundled')


marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,

  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }

  // highlight: function (code, lang, callback) {
  //   console.log('CODE?', result.toString())
  //   pygmentize(
  //     {
  //       lang: lang,
  //       format: 'html'
  //     },
  //     code,
  //     function (error, result) {
  //       console.log('CODE?', result.toString())
  //       callback(error, result.toString());
  //     }
  //   )
  // }
})

module.exports = marked
