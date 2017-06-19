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

require('./routes/api')(app)
require('./helpers')(app)
require('./routes/digest')(app)
require('./routes/skills')(app)
require('./routes/users')(app)
require('./routes/guide')(app)
require('./routes/phases')(app)
require('./routes/modules')(app)

const server = app.listen(process.env.PORT, () => {
  console.log('http://localhost:'+process.env.PORT)
})
