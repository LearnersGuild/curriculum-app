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
      .reduce((index, checkbox) => {
        const label = $(checkbox).data('label')
        index[label] = index[label] || $()
        index[label] = index[label].add(checkbox)
        return index
      }, {})

    const labels = Object.keys(checkboxes)
    return postJSON('/api/checks/status', {type: 'skill', labels: labels})
    .then(checks => {
      $(() => {
        Object.keys(checks).forEach(label => {
          const checkbox = checkboxes[label]
          if (checkbox.length === 0) console.warn('no checkbox found for '+label)
          if (checkbox.prop('checked') !== !!checks[label]) console.info('FIXED',label)
          checkbox.prop('checked', !!checks[label])
        })
      })
    })
  }

  $(reloadSkillCheckboxes)

})()


if (location.pathname.match(/^\/users\/?$/)) $(()=>{

  const form = $('.users-grid-controls')
  const sortInput = $('.users-grid-controls-sort')
  const filterInput = $('.users-grid-controls-filter')

  const sorters = {
    "name asc": (a,b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 :
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
    ,
    "name desc": (a,b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? -1 :
      a.name.toLowerCase() < b.name.toLowerCase() ? 1 : 0
    ,
    "handle asc": (a,b) =>
      a.handle.toLowerCase() < b.handle.toLowerCase() ? -1 :
      a.handle.toLowerCase() > b.handle.toLowerCase() ? 1 : 0
    ,
    "handle desc": (a,b) =>
      a.handle.toLowerCase() > b.handle.toLowerCase() ? -1 :
      a.handle.toLowerCase() < b.handle.toLowerCase() ? 1 : 0
    ,
  }

  const updateUsersGrid = function(){
    const sort = sortInput.val().toLowerCase()
    const filter = filterInput.val().toLowerCase()
    console.log('updateUsersGrid', {sort, filter})

    const usersGrid = $('.users-grid')
    const userNodes = usersGrid.find(' > .users-grid-member')

    userNodes.sort((a, b) => {
      a = $(a).data('user')
      b = $(b).data('user')
      return sorters[sort](a, b)
    })

    userNodes.detach().appendTo(usersGrid);

    userNodes.each((i, node) => {
      const user = $(node).data('user')
      if ((user.name+' '+user.handle+' '+user.email).toLowerCase().includes(filter))
        $(node).show()
      else
        $(node).hide()
    })
  }

  form.on('submit', event => {
    event.preventDefault()
    updateUsersGrid()
  })
  sortInput.on('change', updateUsersGrid)
  filterInput.on('keyup', updateUsersGrid)

  updateUsersGrid()

})
