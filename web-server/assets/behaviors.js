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

  // TODO dry this up, duplicate of /digest/nameToId
  const skillNameToSkillId = name =>
    name
      .replace(/[\/ #]/g, '-')
      .replace(/`/g, '')


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
      const labelHtml = li.html().replace(/<code>(.+)<\/code>/g, '`$1`')
      const skillName = $('<div>'+labelHtml+'</div>').text()
      const skillId = skillNameToSkillId(skillName)
      const href = `/skills/${encodeURIComponent(skillId)}`
      const checkbox = $('<input type="checkbox" class="skill-checkbox" />')
      checkboxes[skillName]= checkbox[0]
      checkbox.data('label', skillName)
      li
        .wrapInner(`<a href="${href}"></a>`)
        .prepend(checkbox)
    })

    Object.keys(checkboxes).forEach(skillName => {
      const checkbox = checkboxes[skillName]
      checkbox.disabled = true
    })

    postJSON('/api/checks/status', {
      type: 'skill',
      labels: Object.keys(checkboxes),
    })
    .then(checks => {
      Object.keys(checkboxes).forEach(skillName => {
        const checkbox = checkboxes[skillName]
        checkbox.checked = skillName in checks && checks[skillName] || false
        checkbox.disabled = false
      })
    })

  })

})()
