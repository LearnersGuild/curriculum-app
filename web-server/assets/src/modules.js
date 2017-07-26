if (location.pathname.match(/^\/modules\//)) {

  const addCheckboxesToSkillsListMembers = () => {
    const skills = JSON.parse($('.skills-data').val() || '[]')

    // HACK encoding fix
    // jQuery seems to decode & encoded characters but leaves html intact. weird
    skills.forEach(skill => {
      skill.html = $('<div>').html(skill.html).html()
    })

    $('.markdown-body li').each((index, li) => {
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
    })
  }

  $(addCheckboxesToSkillsListMembers)
}
