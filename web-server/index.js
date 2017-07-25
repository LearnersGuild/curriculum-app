require('../environment')
const https = require('express-sslify').HTTPS
const express = require('express')
const compression = require('compression')


const app = express()

app.set('view engine', 'jade')
app.set('views', __dirname+'/views')

// ensure secure connection
if (process.env.NODE_ENV === 'production') {
  app.use(https({trustProtoHeader: true}))
}

app.get('/_status', (request, response, next) => {
  response.send('status ok')
})

app.use(compression())
app.use(require('cookie-parser')())
app.use('/assets', express.static(__dirname+'/assets'))

require('./routes/goals')(app)
require('./authentication')(app)
require('./routes/api')(app)
require('./helpers')(app)
require('./routes/digest')(app)
require('./routes/skills')(app)
require('./routes/users')(app)
require('./routes/guide')(app)
require('./routes/phases')(app)
require('./routes/modules')(app)
require('./routes/calendar')(app)
require('./routes/cos')(app)

app.get('/', (request, response, next) => {
  response.renderMarkdownFile(`/README.md`)
})

;[
  'CONTRIBUTING.md',
  'SUPPORT.md',
].forEach(topLevelMarkdownFile => {
  app.get(`/${topLevelMarkdownFile}`, (request, response, next) => {
    response.renderMarkdownFile(`/${topLevelMarkdownFile}`)
  })
})


if (!module.parent) {
  app.listen(process.env.PORT, () => {
    console.log('http://localhost:'+process.env.PORT)
  })
}else{
  module.exports = app
}
