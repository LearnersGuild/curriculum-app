const { addUserToRequestFromJWT } = require('@learnersguild/idm-jwt-auth/lib/middlewares')
const { idmGraphQLFetch } = require('@learnersguild/idm-jwt-auth/lib/utils')

if ( !process.env.JWT_PUBLIC_KEY ) {
  throw new Error(`You do not have a JWT_PUBLIC_KEY in your .env. Please add it.`)
}

module.exports = app => {
  app.use(addUserToRequestFromJWT)

  // redirect to login if not logged in
  app.use((req, res, next) => {
    req.completeUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
    if (req.user) return next()
    res.redirect(
      `${process.env.IDM_BASE_URL}/sign-in?redirect=${encodeURIComponent(req.completeUrl)}`
    )
  })

  app.use((req, res, next) => {
    res.locals.user = req.user
    res.locals.logoutUrl = `${process.env.IDM_BASE_URL}/auth/sign-out?redirect=${encodeURIComponent(req.completeUrl)}`
    req.queryIdm = function(query, variables={}){
      return idmGraphQLFetch({query, variables}, req.cookies.lgJWT)
    }
    next()
  })
}
