const qs = require('./qs')
const postJSON = require('./postJSON')

$(document).on('change', '.skill-checkbox', event => {
  const checkbox = event.target
  checkbox.disabled = true
  postJSON('/api/checks/set', {
    label: $(checkbox).data('label'),
    checked: checkbox.checked,
  })
  .then(_ => {
    const skillProgress = $('.skills-list-progress progress')
    checkbox.disabled = false
    if (skillProgress.length === 0) return
    const numerator = $('.skills-list-progress progress')[0].value += checkbox.checked ? 1 : -1
    $('.skills-list-progress .progress-numerator').text(numerator)
  })
  .catch(_ => {
    checkbox.disabled = false
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
  return postJSON('/api/checks/status', {labels})
  .then(checks => {
    $(() => {
      let numerator = 0
      Object.keys(checks).forEach(label => {
        const checkbox = checkboxes[label]
        const checked = !!checks[label]
        checkbox.prop('checked', checked)
        if (checked) numerator++;
      })

      $('.skills-list-progress progress').attr('value', numerator)
      $('.skills-list-progress .progress-numerator').text(numerator)
    })
  })
}

$(reloadSkillCheckboxes)




// Skills List Behaviors

const setFilter = filter => {
  $('.skills-list-filter-input').val(filter)
  setFilterQueryParam(filter)
  filterSkillsList(filter)
}

const setFilterQueryParam = filter => {
  const search = qs.parse(location.search.slice(1))
  if (filter) {
    search.f = filter
  }else{
    delete search.f
  }
  history.replaceState({}, '', `${location.pathname}?${qs.stringify(search)}`)
}

const matchesFilters = (filters, string) => {
  string = string.toLowerCase()
  return filters.every(filter => string.includes(filter))
  return filters.some(filter => string.includes(filter))
}

const filterSkillsList = filter => {
  const filters = filter.trim().toLowerCase().split(/\s+/)
  $('.skills-list .skills-list-list > li').each((i, skill) => {
    if (filter.length === 0 || matchesFilters(filters, $(skill).text())){
      $(skill).show()
    }else{
      $(skill).hide()
    }
  })
}

$(() => {
  const filter = qs.parse(location.search.slice(1)).f
  if (filter) setFilter(filter.replace(/\+/g, ' '))
})

$(document).on('keyup', '.skills-list-filter-input', event => {
  const filter = event.target.value
  if (event.key === "Escape"){
    setFilter('')
    return
  }
  if (event.key === "Enter"){
    setFilterQueryParam(filter)
    return
  }
  filterSkillsList(filter)
})

$(document).on('change blur', '.skills-list-filter-input', event => {
  setFilterQueryParam(event.target.value)
})

$(document).on('click', '.skills-list-filter', event => {
  event.preventDefault()
  setFilter(event.target.innerText)
})

$(document).on('click', '.skills-list-clear-filter', event => {
  event.preventDefault()
  setFilter('')
})
