if (location.pathname.match(/^\/cos\//)) $(() => {
  const workshopsListElements = $('#workshops + ul:first > li')

  workshopsListElements.each((index, node) => {
    const workshopsListElement = $(node)
    const checkbox = $('<input type="checkbox" class="cos-workshop-checkbox" />')
    workshopsListElement
      .addClass('list-item-with-checkbox')
      .prepend(checkbox)
  })

  $(document).on('change', '.cos-workshop-checkbox', (event) => {
    console.log('COS WORKSHOP CHECKBOX CHANGE', event.target)
  })
})
