if (location.pathname.match(/^\/users\/?$/)) {

  const initializeUsersGridControls = () => {
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

      $('.users-grid').each(function(){
        const usersGrid = $(this)

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
      })
    }

    form.on('submit', event => {
      event.preventDefault()
      updateUsersGrid()
    })
    sortInput.on('change', updateUsersGrid)
    filterInput.on('keyup', updateUsersGrid)

    updateUsersGrid()
  }

  $(initializeUsersGridControls)
}
