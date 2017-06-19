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

  if (onModulePage) $(() => {
    const skills = JSON.parse($('.skills-data').val())
    const lis = $('.markdown-body li').filter((index, li) => {
      li = $(li)
      const html = li.html()
      const skill = skills.find(skill => skill.html === html)
      if (!skill) return false
      const checkbox = $('<input type="checkbox" class="skill-checkbox" />')
      checkbox.attr('data-label', skill.id)
      checkbox.data('label', skill.id)
      checkbox[0].checked = skill.checked
      li
        .data('skill', skill)
        .addClass('list-item-with-checkbox')
        .wrapInner(`<a href="${skill.path}"></a>`)
        .prepend(checkbox)

      return true
    })

  })

  const reloadSkillCheckboxes = () => {
    const checkboxes = $('.skill-checkbox[data-label]').get()
    const labels = checkboxes.map(checkbox => $(checkbox).data('label'))
    return postJSON('/api/checks/status', {type: 'skill', labels: labels})
    .then(checks => {
      $(() => {
        Object.keys(checks).forEach(label => {
          const checkbox = $('.skill-checkbox[data-label="'+label+'"]')
          if (checkbox.length === 0) console.warn('no checkbox found for '+label)
          if (checkbox.prop('checked') !== !!checks[label]) console.info('FIXED',label)
          checkbox.prop('checked', !!checks[label])
        })
      })
    })
  }

  $(reloadSkillCheckboxes)


})()
