$(document).on('click', '.skills-list-item-toggle-button', event => {
  event.preventDefault()
  $(event.target).closest('.skills-list-item').toggleClass('skills-list-item-expanded')
})


if (location.pathname.match(/^\/modules\//)) $(() => {
  const ul = $('h2#skills + ul').addClass('skills')
  const lis = ul.find('li')
  lis.each((i, li) => {
    $(li).data('skill', $(li).text())
  })
  const skills = lis.get().map(li => $(li).data('skill'))

  lis
    .addClass('list-item-with-checkbox')
    .wrapInner('<span></span>')
    .prepend('<input type="checkbox">')
    .wrapInner('<label></label>')
    .find('> label > input')

  fetch('/api/skills', {credentials: 'same-origin'})
    .then(response => response.json())
    .then(console.log)

  lis.on('click', event => {
    const skill = $(event.target).closest('li').data('skill')
    console.log('TOGGLE SKILL', skill)
  })
  // <h2 id="skills">Skills</h2>
})
