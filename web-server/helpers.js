const util = require('util')
const path = require('path')
const fs = require('fs-extra')
const renderMarkdown = require('./renderMarkdown')
const escapeHTML = require('jade').runtime.escape

module.exports = app => {

  app.locals.inspect = object =>
    util.inspect(object, {
      depth: null,
      colors: false,
      maxArrayLength: null,
    })
  app.locals.escapeHTML = escapeHTML
  app.locals.renderMarkdown = renderMarkdown

  app.locals.renderSkill = skill =>
    renderMarkdown(skill.rawText).slice(3,-5).trim()

  app.locals.sortSkills = skills => {
    console.log('**** sortSkills::', skills);
    skills = Array.isArray(skills)
      ? skills
      : Object.keys(skills).map(id => skills[id])
    return skills.sort((a,b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 :
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
    )
  }

  app.ensureTrailingSlash = (request, response, next) => {
    if (!request.path.match(/\/$/)){
      response.redirect(request.path+'/')
    }else{
      next()
    }
  }

  app.use((request, response, next) => {

    response.path = request.url
    response.locals.path = response.path

    response.renderNotFound = function(){
      response
        .status(404)
        .render('not_found')
    }

    response.renderError = function(error){
      response.status(error.status || 500).send(error.message)
    }

    response.renderServerError = function(error){
      error.status = 500
      response.renderError(error)
    }

    response.renderFile = function(relativePath){
      if (relativePath.match(/README\.md$/)){
        return response.redirect(relativePath.replace(/README\.md$/, ''))
      }
      if (relativePath.match(/\.md$/)){
        return response.renderMarkdownFile(relativePath)
      }
      const absolutePath = path.resolve(__dirname, '..', '.'+relativePath)

      fs.readdir(absolutePath)
        .then(files => {
          if (!request.path.match(/\/$/)){
            response.redirect(request.path+'/')
          }else{
            if (files.includes('README.md')){
              response.renderMarkdownFile(relativePath+'/README.md')
            }else{
              response.render('directory', {files})
            }
          }
        })
        .catch(error => {
          if (error.message.includes('ENOENT')){
            return response.renderNotFound()
          }
          if (error.message.includes('ENOTDIR')){
            return response.sendFile(absolutePath)
          }
          response.renderError(error)
        })
    }

    response.renderMarkdownFile = function(relativeFilePath=request.path){
      const absoluteFilePath = path.resolve(__dirname, '..', '.'+relativeFilePath)
      fs.readFile(absoluteFilePath)
        .then(file => {
          response.renderMarkdown(file.toString())
        })
        .catch(error => {
          if (error.message.includes('ENOENT')){
            response.renderNotFound()
          }else{
            response.renderServerError(error)
          }
        })
    }

    response.renderMarkdown = function(markdown){

      renderMarkdown(markdown, (error, content) => {
        if (error) return response.renderServerError(error)

        const path = response.path.match(/\/$/) ? response.path+'README.md' : response.path

        const file = {
          content,
          sourceUrl: 'https://github.com/GuildCrafts/curriculum/blob/master'+path,
          editeUrl: 'https://github.com/GuildCrafts/curriculum/edit/master'+path,
        }
        response.render('markdown', file)
      })
    }

    next()
  })

}
