module.exports = app => {

  app.get('/profile', (request, response, next) => {
    request.backOffice.getUserByHandle(request.user.handle).then(user => {
      response.render('users/profile', {user})
    })
    .catch(next)
  })

}
