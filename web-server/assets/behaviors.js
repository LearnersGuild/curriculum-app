(()=>{

  const onModulePage = location.pathname.match(/^\/modules\//)

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



  if (onModulePage) $(() => {
    const skills = JSON.parse($('.skills-data').val())
    console.log('skills', skills)

    const lis = $('.markdown-body li').filter((index, li) => {
      li = $(li)
      const html = li.html()
      const skill = skills.find(skill => skill.html === html)
      if (!skill) return false

      const checkbox = $('<input type="checkbox" class="skill-checkbox" />')
      checkbox.data('label', skill.id)
      checkbox[0].checked = skill.checked
      li
        .data('skill', skill)
        .addClass('list-item-with-checkbox')
        .wrapInner(`<a href="${skill.path}"></a>`)
        .prepend(checkbox)

      return true
    })

  //   postJSON('/api/checks/status', {
  //     type: 'skill',
  //     labels: Object.keys(checkboxes),
  //   })
  //   .then(checks => {
  //     Object.keys(checkboxes).forEach(skillName => {
  //       const checkbox = checkboxes[skillName]
  //       checkbox.checked = skillName in checks && checks[skillName] || false
  //       checkbox.disabled = false
  //     })
  //   })

  })

})()
