(()=>{

  const postJSON = (path, data) => {
    return $.ajax({
      type: "POST",
      url: path,
      contentType : 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
    }).promise()
  }

  $(document).on('click', '.skills-list-item-toggle-button', event => {
    event.preventDefault()
    $(event.target).closest('.skills-list-item').toggleClass('skills-list-item-expanded')
  })


  if (location.pathname.match(/^\/modules\//)) $(() => {
    const checkboxes = {}

    const ul = $('h2#skills + ul').addClass('skills')

    const lis = ul.find('li')
      .addClass('list-item-with-checkbox')

    lis.each((i, li) => {
      li = $(li)
      const label = li.text()
      const labelUrl = `/skills/${encodeURIComponent(label.replace(/ /g,'-'))}`
      const input = $('<input type="checkbox" class="skill-checkbox" />')
      checkboxes[label]= input[0]

      input.on('change', event => {
        postJSON('/api/checks/set', {
          label: label,
          checked: event.target.checked,
        })
      })

      li
        .wrapInner(`<a href="${labelUrl}"></a>`)
        .prepend(input)
    })

    postJSON('/api/checks/status', {
      type: 'skill',
      labels: Object.keys(checkboxes),
    })
    .then(checks => {
      Object.keys(checkboxes).forEach(label => {
        const checkbox = checkboxes[label]
        checkbox.checked = label in checks && checks[label] || false
      })
    })

  })

})()
