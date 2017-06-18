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


  $(document).on('change', '.skill-checkbox', event => {
    const checkbox = event.target
    checkbox.disabled = true
    postJSON('/api/checks/set', {
      label: $(checkbox).data('label'),
      checked: checkbox.checked,
    }).then(
      _ => { checkbox.disabled = false },
      _ => { checkbox.disabled = false }
    )
  })


  if (location.pathname.match(/^\/modules\//)) $(() => {
    const findSkillLis = () => {
      let withinSkillsSection = false
      return $('h1,h2,ul').filter((i, node) => {
        if ($(node).is('h1,h2')) withinSkillsSection = false
        if ($(node).is('h2#skills')) withinSkillsSection = true
        return withinSkillsSection && $(node).is('ul')
      }).find('> li')
    }

    const lis = findSkillLis()
      .addClass('list-item-with-checkbox')

    const checkboxes = {}
    lis.each((i, li) => {
      li = $(li)
      const label = li.text()
      const labelUrl = `/skills/${encodeURIComponent(label.replace(/ /g,'-'))}`
      const checkbox = $('<input type="checkbox" class="skill-checkbox" />')
      checkboxes[label]= checkbox[0]
      checkbox.data('label', label)
      li
        .wrapInner(`<a href="${labelUrl}"></a>`)
        .prepend(checkbox)
    })

    Object.keys(checkboxes).forEach(label => {
      const checkbox = checkboxes[label]
      checkbox.disabled = true
    })

    postJSON('/api/checks/status', {
      type: 'skill',
      labels: Object.keys(checkboxes),
    })
    .then(checks => {
      Object.keys(checkboxes).forEach(label => {
        const checkbox = checkboxes[label]
        checkbox.checked = label in checks && checks[label] || false
        checkbox.disabled = false
      })
    })

  })

})()
