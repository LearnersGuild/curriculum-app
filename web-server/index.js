const fs = require('fs')
const path = require('path')
const express = require('express')
require('./environment')

const renderMarkdown = require('./renderMarkdown')

const app = express()
const APP_ROOT = path.resolve(__dirname, '..')

app.set('view engine', 'jade')
app.set('views', __dirname+'/views')

app.use('/assets', express.static(__dirname+'/assets'))

app.use((request, response, next) => {
  // load modules
  fs.readdir(APP_ROOT+'/modules', (error, files) => {
    response.locals.modules = files.filter(file =>
      !/\.md$/.test(file)
    )
    next()
  })
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

  response.renderMarkdownFile = function(relativeFilePath){
    const absoluteFilePath = path.resolve(__dirname, '..', '.'+relativeFilePath)
    fs.readFile(absoluteFilePath, (error, file) => {
      if (error){
        if (error.message.includes('ENOENT')){
          response.renderNotFound()
        }else if (error.message.includes('EISDIR')){
          response.renderMarkdownFile(relativeFilePath+'/README.md')
        }else{
          response.renderServerError(error)
        }
        return
      }
      renderMarkdown(file.toString(), (error, html) => {
        if (error) return response.renderServerError(error)
        response.render('markdown', {content: html})
      })
    })
  }

  next()
})


app.get(/.*$/, (request, response, next) => {
  const path = request.path
  if (!/(\/|\.md)$/.test(path)){
    response.redirect(path+'/')
  }else{
    response.renderMarkdownFile(request.path)
  }
})

const server = app.listen(process.env.PORT, () => {
  console.log('http://localhost:'+process.env.PORT)
})
