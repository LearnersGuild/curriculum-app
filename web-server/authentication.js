const BackOffice = require('../backoffice')
const { addUserToRequestFromJWT } = require('@learnersguild/idm-jwt-auth/lib/middlewares')

if ( process.env.DISABLE_IDM !== '1' && !process.env.JWT_PUBLIC_KEY ) {
  throw new Error(`You do not have a JWT_PUBLIC_KEY in your .env. Please add it.`)
}

const addFakeAuthenticatedUser = (request, response, next ) => {
  request.user = {id: 'this is a fake user!!', handle: 'Fake News'}
  response.locals.currentUser = request.user
  next()
}

if (process.env.DISABLE_IDM === '1') {
  module.exports = app => {
    app.use(addFakeAuthenticatedUser)
  }
} else {
  module.exports = app => {
    app.use(addUserToRequestFromJWT)

    app.use((request, response, next) => {
      const { user } = request
      if (!user){
        const completeUrl = `${request.protocol}://${request.get('host')}${request.originalUrl}`
        response.redirect(
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
}
