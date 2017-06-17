const fs = require('fs')
const path = require('path')
const express = require('express')
require('./environment')
const renderMarkdown = require('./renderMarkdown')

const app = express()

app.use((request, response, next) => {

  response.renderNotFound = function(){
    this.status(404).send('Not Found')
  }

  response.renderServerError = function(error){
    this.status(500).send(error.message)
  }

  response.renderMarkdown = function(markdown){
    renderMarkdown(markdown, (error, html) => {
      if (error) return this.renderServerError(error)
      response
        .type('html')
        .send(html)
    })
  }

  response.renderMarkdownFile = function(path){
    fs.readFile(path, (error, file) => {
      if (error){
        if (error.message.includes('ENOENT')){
          response.renderNotFound()
        }else if (error.message.includes('EISDIR')){
          response.renderMarkdownFile(path+'/README.md')
        }else{
          response.renderServerError(error)
        }
        return
      }
      response.renderMarkdown(file.toString())
    })
  }

  next()
})


app.get(/.*$/, (request, response, next) => {
  const relativeFilePath = request.url.slice(1)
  const absoluteFilePath = path.resolve(__dirname, '..', relativeFilePath)
  response.renderMarkdownFile(absoluteFilePath)
})

const server = app.listen(process.env.PORT, () => {
  console.log('http://localhost:'+process.env.PORT)
})
