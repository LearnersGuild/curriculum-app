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
  return `<pre><code class="hljs ${language||''}">${highlighted}</code></pre>`;
};

renderer.listitem = function(text) {
  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text
      .replace(/^\s*\[ \]\s*/, '<input type="checkbox" /> ')
      .replace(/^\s*\[x\]\s*/, '<input type="checkbox" checked /> ');
    return '<li class="list-item-with-checkbox">' + text + '</li>';
  } else {
    return '<li>' + text + '</li>';
  }
};


marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
})

module.exports = marked
