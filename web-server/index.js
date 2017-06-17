const fs = require('fs')
const https = require('express-sslify').HTTPS
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
require('./environment')
const renderMarkdown = require('./renderMarkdown')
const loadDigest = require('../digest')

const app = express()

app.set('view engine', 'jade')
app.set('views', __dirname+'/views')

// ensure secure connection
if (process.env.NODE_ENV === 'production') {
  app.use(https({trustProtoHeader: true}))
}

app.use(cookieParser())
app.use('/assets', express.static(__dirname+'/assets'))

require('./authentication')(app)

app.use((request, response, next) => {
  if (request.user.roles.includes('staff')) return next()
  response.status(401).send('Unauthorized')
})
app.use((request, response, next) => {
  loadDigest()
    .then(digest => {
      Object.assign(response.locals, digest)
      next()
    })
    .catch(next)
})

app.use((request, response, next) => {

  response.path = request.url
  response.locals.path = response.path

  response.renderNotFound = function(){
    response
      .status(404)
      .render('not_found')
  }

  response.renderServerError = function(error){
    this.status(500).send(error.message)
  }

  response.renderMarkdownFile = function(relativeFilePath=request.path){
    const absoluteFilePath = path.resolve(__dirname, '..', '.'+relativeFilePath)
    fs.readFile(absoluteFilePath, (error, file) => {
      if (error){
        if (error.message.includes('ENOENT')){
          response.renderNotFound()
        }else if (error.message.includes('EISDIR')){
          response.renderMarkdownFile(request.path+'/README.md')
        }else{
          response.renderServerError(error)
        }
        return
      }
      response.renderMarkdown(file.toString())
    })
  }

  response.renderMarkdown = function(markdown){

    renderMarkdown(markdown, (error, content) => {
      if (error) return response.renderServerError(error)

      const file = {
        content,
        sourceUrl: 'https://github.com/GuildCrafts/curriculum/blob/master'+response.path,
        editeUrl: 'https://github.com/GuildCrafts/curriculum/edit/master'+response.path,
      }
      response.render('markdown', file)
    })
  }

  next()
})


app.get('/skills', (request, response, next) => {
  response.render('skills')
})

app.get(/.*$/, (request, response, next) => {
  const path = request.path
  if (!/(\/|\.md)$/.test(path)){
    response.redirect(path+'/')
  }else{
    response.renderMarkdownFile()
  }
})

const server = app.listen(process.env.PORT, () => {
  console.log('http://localhost:'+process.env.PORT)
})
