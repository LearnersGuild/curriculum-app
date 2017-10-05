const postJSON = require('./postJSON')

const checkSkill = skillId =>
  postJSON(`/api/skills/${skillId}/check`)

const uncheckSkill = skillId =>
  postJSON(`/api/skills/${skillId}/uncheck`)

$(document).on('change', '.skill-checkbox', event => {
  const checkbox = event.target
  checkbox.disabled = true

  const skillId = $(checkbox).data('skill-id')

  const action = checkbox.checked
    ? checkSkill
    : uncheckSkill

  action(skillId).then(_ => {
    checkbox.disabled = false
    const skillProgress = $('.skills-list-progress progress')
    if (skillProgress.length === 0) return
    const numerator = $('.skills-list-progress progress')[0].value += checkbox.checked ? 1 : -1
    $('.skills-list-progress .progress-numerator').text(numerator)
  })
  .catch(error => {
    console.warn('failed to either check or uncheck skill')
    console.error(error)
    checkbox.disabled = false
  })
})

const reloadSkillCheckboxes = () => {
  const checkboxes = $('.skill-checkbox[data-skill-id]').get()
  const skillIds = checkboxes.map(c => $(c).data('skill-id'))
  if (skillIds.length === 0) return
  return postJSON('/api/skills/checked', {skills: skillIds})
  .then(checkedSkills => {
    $(() => {
      checkboxes.forEach(checkbox => {
        checkbox = $(checkbox)
        const skillId = checkbox.data('skill-id')
        const checked = checkedSkills.includes(skillId)
        checkbox.prop('checked', checked)
      })
      const numerator = checkedSkills.length
      $('.skills-list-progress progress').attr('value', numerator)
      $('.skills-list-progress .progress-numerator').text(numerator)
    })
  })
}

$(reloadSkillCheckboxes)




// Skills List Behaviors


const setFilter = filter => {
  $('.skills-list-filter-input').val(filter)
  filterSkillsList(filter)
}

const matchFilter = (filter, string) => {
  string = string.toLowerCase()
  return (filter || '').trim().toLowerCase().split(/\s+/)
    .every(filter => string.includes(filter))
}

const filterSkillsList = filter => {
  $('.skills-list .skills-list-list > li').each((i, skill) => {
    if (filter.length === 0 || matchFilter(filter, $(skill).text())){
      $(skill).show()
    }else{
      $(skill).hide()
    }
  })
}

const hideEmptyFilters = () => {
  const skills = $('.skills-list .skills-list-list > li')
    .get()
    .map(n => $(n).text() || '')

  $('.skills-list-filter').each((index, filterNode) => {
    filterNode = $(filterNode)
    const filter = $(filterNode).text()
    const numberOfSkills = skills
      .filter(skill => matchFilter(filter, skill)).length
    if (numberOfSkills > 0) {
      filterNode.text(`(${numberOfSkills}) ${filterNode.text()}`)
    } else {
      filterNode.hide()
    }
  })
}

$(() => {
  hideEmptyFilters()
  filterSkillsList($('.skills-list-filter-input').val())
})

$(document).on('keyup', '.skills-list-filter-input', event => {
  if (event.key === "Escape" )
    setFilter('')
  else
    filterSkillsList(event.target.value)
})

$(document).on('click', '.skills-list-filter', event => {
  event.preventDefault()
  setFilter(event.target.dataset.value)
})

$(document).on('click', '.skills-list-clear-filter', event => {
  event.preventDefault()
  setFilter('')
})
