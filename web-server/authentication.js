const { addUserToRequestFromJWT } = require('@learnersguild/idm-jwt-auth/lib/middlewares')
const { idmGraphQLFetch } = require('@learnersguild/idm-jwt-auth/lib/utils')

if ( !process.env.JWT_PUBLIC_KEY ) {
  throw new Error(`You do not have a JWT_PUBLIC_KEY in your .env. Please add it.`)
}

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
    }
    if (user.roles.includes('staff') || user.roles.includes('coach')){
      return next()
    }
    response.status(401).send('Unauthorized')
  })

  app.use((request, response, next) => {
    response.locals.user = request.user
    response.locals.logoutUrl = `${process.env.IDM_BASE_URL}/auth/sign-out?redirect=${encodeURIComponent(request.completeUrl)}`
    request.queryIdm = function(query, variables={}){
      return idmGraphQLFetch({query, variables}, request.cookies.lgJWT)
    }
    next()
  })

}
