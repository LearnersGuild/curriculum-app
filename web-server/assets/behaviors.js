$(document).on('click', '.skills-list-item-toggle-button', event => {
  event.preventDefault()
  $(event.target).closest('.skills-list-item').toggleClass('skills-list-item-expanded')
})
