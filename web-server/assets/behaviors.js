(()=>{

  const postJSON = (path, data) => {
    return $.ajax({
      type: "POST",
      url: path,
      contentType : 'application/json',
      dataType: 'json',
      data: JSON.stringify(data),
    })
  }

  const request = (method, path, data) => {
    const options = {
      method: method,
      credentials: 'same-origin',
      qs: $.param(data)
    }
    console.log('REQUEST', method, path, options)
    return fetch(path, options)
      .then(response => response.json())
      .catch(error => {
        console.warn('RESONSE ERROR')
        console.error(error)
        throw error
      })
      .then(response => {
        console.log('RESONSE', response)
        return response
      })
  }

  $(document).on('click', '.skills-list-item-toggle-button', event => {
    event.preventDefault()
    $(event.target).closest('.skills-list-item').toggleClass('skills-list-item-expanded')
  })


  if (location.pathname.match(/^\/modules\//)) $(() => {
    const labels = []

    const ul = $('h2#skills + ul').addClass('skills')

    const lis = ul.find('li')

    lis.each((i, li) => {
      li = $(li)
      const label = li.text()
      const labelUrl = `/skills/${encodeURIComponent(label.replace(/ /g,'-'))}`
      labels.push(label)
      li.data('skill', {label})
      li.wrapInner(`<a href="${labelUrl}"></a>`)
    })

    lis
      .addClass('list-item-with-checkbox')
      .prepend('<input type="checkbox" class="skill-checkbox" />')

    lis.find('> input').on('change', event => {
      const label = $(event.target).closest('li').data('skill').label
      console.log('CHECK!', label)
    })

    postJSON('/api/checks/status', {
      type: 'skill',
      labels: labels,
    })
    .then(response => {
      console.log('CHECKS', response)
    })

  })

})()
