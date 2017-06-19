require('../environment')
const https = require('express-sslify').HTTPS
const express = require('express')

const app = express()

app.set('view engine', 'jade')
app.set('views', __dirname+'/views')

// ensure secure connection
if (process.env.NODE_ENV === 'production') {
  app.use(https({trustProtoHeader: true}))
}
app.use(require('serve-favicon')(`${__dirname}/assets/favicon.ico`))
app.use(require('cookie-parser')())
app.use('/assets', express.static(__dirname+'/assets'))

require('./authentication')(app)

app.use((request, response, next) => {
  if (request.user.roles.includes('staff')) return next()
  response.status(401).send('Unauthorized')
})

require('./digest')(app)
require('./api')(app)
require('./helpers')(app)
require('./skills')(app)
require('./users')(app)
app.get('/guide', (request, response, next) => {
  response.render('guide')
})
require('./modules')(app)

const server = app.listen(process.env.PORT, () => {
  console.log('http://localhost:'+process.env.PORT)
})
