const marked = require('marked')
const highlightjs = require('highlight.js')
// const pygmentizeBundled = require('pygmentize-bundled')
// const highlight = require('pygments').colorize;
const pygmentize = require('pygmentize-bundled')

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
  // Check whether the given language is valid for highlight.js.
  const validLang = !!(language && highlightjs.getLanguage(language));
  // Highlight only if the language is valid.
  const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
  // Render the highlighted code with `hljs` class.
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};


marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  // highlight: function (code, language) {
  //   // Check whether the given language is valid for highlight.js.
  //   const validLang = !!(language && highlightjs.getLanguage(language));
  //   // Highlight only if the language is valid.
  //   const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
  //   // Render the highlighted code with `hljs` class.
  //   return `<code class="hljs ${language}">${highlighted}</code>`;

  //   // return highlightjs.highlightAuto(code).value;
  // }

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
