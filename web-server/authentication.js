const bodyParser = require('body-parser')
const Cookies = require('cookies')
const BackOffice = require('../backoffice')
const { addUserToRequestFromJWT } = require('@learnersguild/idm-jwt-auth/lib/middlewares')

if ( process.env.DISABLE_IDM !== '1' && !process.env.JWT_PUBLIC_KEY ) {
  throw new Error(`You do not have a JWT_PUBLIC_KEY in your .env. Please add it.`)
}

module.exports = app => {
  app.use((request, response, next) => {
    request.cookies = new Cookies(request, response)
    request.cookies.lgJWT = request.cookies.get('lgJWT')
    next()
  })

  if (process.env.DISABLE_IDM === '1') {
    app.use((request, response, next ) => {
      request.user = {
        id: 'this is a fake user!!',
        handle: 'Fake News',
        roles: ['learner'],
      }
      next()
    })
  }

  if (process.env.NODE_ENV === 'test') {
    // we might be able to do this in the test by setting a cookie
    app.post('/__login', bodyParser.json(), (request, response, next) => {
      const currentUser = request.body
      request.cookies.set('__user', JSON.stringify(currentUser));
      response.status(200).json({currentUser})
    })

    app.use((request, response, next) => {
      const backdoorUser = request.cookies.get('__user')
      if (backdoorUser) request.user = JSON.parse(backdoorUser)
      next()
    })

  }else{
    app.use(addUserToRequestFromJWT)
  }

  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

  app.use((request, response, next) => {
    const { user } = request
    if (!user){
      const completeUrl = `${protocol}://${request.get('host')}${request.originalUrl}`
      response.redirect(
        302, // temporary redirect
        `${process.env.IDM_BASE_URL}/sign-in?redirect=${encodeURIComponent(completeUrl)}`
      )
      return
    }else{
      user.isAdmin = user.roles.includes('staff')
    }
    next()
  })

  app.use((request, response, next) => {
    response.locals.currentUser = request.user
    response.locals.logoutUrl = `${process.env.IDM_BASE_URL}/auth/sign-out?redirect=${encodeURIComponent(request.completeUrl)}`
    request.backOffice = new BackOffice(request.cookies.lgJWT)
    next()
  })

}
