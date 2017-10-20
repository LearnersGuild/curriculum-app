if (location.pathname.match(/^\/(modules|challenges)\//)) {

  const addCheckboxesToSkillsListMembers = () => {
    const div = $('<div>')
    const skills = JSON.parse($('.skills-data').val() || '[]')

    // pass each skill.nameAsHTML value through jquery and a DOM element to
    // ensure that the html we have matches the html jQuery will give
    // us from the DOM
    skills.forEach(skill => {
      skill.nameAsHTML = div.html(skill.nameAsHTML).html()
    })

    $('.markdown-body li').each((index, li) => {
      li = $(li)
      const html = li.html()
      const skill = skills.find(skill => skill.nameAsHTML === html)
      if (!skill) return false
      const checkbox = $('<input type="checkbox" class="skill-checkbox" />')
      checkbox.attr('data-skill-id', skill.id)
      checkbox.data('skill-id', skill.id)
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
