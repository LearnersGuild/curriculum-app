const escapeRegExp = require('escape-string-regexp')
const {loadDigest} = require('./digest')

loadDigest().then((digest) => {
  const glossary = digest.glossary

  Object.values(glossary).forEach((term) => {

    $('div.markdown-body *').each((i, element) => {

      const text = $(element).text()

      if (text.includes(term.value) && element.children.length === 0) {
        const innerContent = element.innerText
        const newContent = innerContent.replace(term.value, `<a href="${term.path}" class="double-underline">${term.value}</a>`)

        element.innerHTML = newContent
      }
    })
  })
})
.catch(() => {})
