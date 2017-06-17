const marked = require('marked')
const pygmentizeBundled = require('pygmentize-bundled')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang, callback) {
    pygmentizeBundled(
      {
        lang: lang,
        format: 'html'
      },
      code,
      function (error, result) {
        callback(error, result.toString());
      }
    );
  }
})

module.exports = marked
