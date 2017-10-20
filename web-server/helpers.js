const util = require('util')
const path = require('path')
const moment = require('moment')
const fs = require('fs-extra')
const escapeHTML = require('jade').runtime.escape
const renderMarkdown = require('./renderMarkdown')
const queries = require('../database/queries')

module.exports = app => {

  app.locals.inspect = object =>
    util.inspect(object, {
      depth: null,
      colors: false,
      maxArrayLength: null,
    })

  app.locals.escapeHTML = escapeHTML

  app.locals.renderMarkdown = renderMarkdown

  app.locals.renderDate = date =>
    date ? moment(date).format("YYYY/MM/DD") : null

  app.locals.renderDatetime = date =>
    date ? moment(date).format("YYYY/MM/DD HH:mm") : null

  app.locals.timeAgoInWords = date =>
    date ? moment(date).fromNow() : null

  app.locals.weeksAgoInWords = date =>
    date ? moment().diff(moment(date), 'week')+' weeks ago' : null

  app.locals.sortSkills = skills => {
    skills = Array.isArray(skills)
      ? skills
      : Object.keys(skills).map(id => skills[id])
    return skills.sort((a,b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 :
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
    )
  }

  app.ensureAdmin = (request, response, next) => {
    if (!request.user.isAdmin) return response.renderNotFound()
    next()
  }

  app.ensureTrailingSlash = (request, response, next) => {
    if (!request.path.match(/\/$/)){
      response.redirect(request.path+'/')
    }else{
      next()
    }
  }

  app.use((request, response, next) => {

    response.path = request.url.split('?')[0]
    response.locals.IDM_BASE_URL = process.env.IDM_BASE_URL
    response.locals.currentURL = (
      request.protocol +
      '://' +
      request.get('host') +
      request.originalUrl
    )
    response.locals.path = response.path

    response.renderNotFound = function(){
      response
        .status(404)
        .render('not_found', {title: 'Not Found'})
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
              response.render('directory', {files, title: relativePath})
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

    response.renderMarkdownFile = function(relativeFilePath=request.path, locals={}){
      Object.assign(response.locals, locals)
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

        const title = getTitleFromHTML(content)

        const file = {
          content,
          title,
          sourceUrl: 'https://github.com/GuildCrafts/curriculum/blob/master'+path,
          editeUrl: 'https://github.com/GuildCrafts/curriculum/edit/master'+path,
        }
        response.render('markdown', file)
      })
    }

    request.getUserIncludingCheckedSkills = (handle, options={}) => {
      return request.backOffice.getUserByHandle(handle, options).then(user => {
          return queries.getCheckedSkills(user.id).then(checkedSkills => {
            user.checkedSkills = checkedSkills
            return user
          })
        })
    }

    response.renderModuleOrChallenge = (type, id, request, response, next) => {
      const userId = request.user.id
      // const { moduleId } = request.params
      const { digest } = response

      const moduleOrChallenge = digest[type+'s'][id]
      if (moduleOrChallenge){

        // const skillData = currentModule.skills
        //   .map(id => {
        //     const { nameAsHTML, path } = digest.skills[id]
        //     return { id, nameAsHTML, path }
        //   })

      }

      // const currentModule = digest.modules[moduleId]
      // if (!currentModule) return next()


      // response.locals.moduleId = moduleId
      // response.locals.currentModule = currentModule
      response.locals.skillData = skillData

      const labels = skillData.map(skill => skill.id)
      queries.getChecksForUserAndLabels({userId, labels})
        .then(checks => {
          skillData.forEach(skill => {
            skill.checked = !!checks[skill.id]
          })
          response.renderMarkdownFile(`/challenges/${challengeId}/README.md`)
        })
        .catch(next)
    }

    request.getUserWithCheckLog = (handle, options={}) => {
      return request.backOffice.getUserByHandle(handle, options)
        .then(learner => {
          return queries.getCheckLogsForUsers([learner.id])
          .then(checkLogs => {
            const checkLog = checkLogs[learner.id]
            learner.checkLog = checkLog
            learner.checkedSkills = checkLog
              .filter(checkLogLine => checkLogLine.checked)
              .map(checkLogLine => checkLogLine.label)
            return learner
          })
        })
    }

    request.getUsersForPhaseIncludingCheckedSkills = phaseNumber => {
      return request.backOffice.getAllLearners({
        phase: phaseNumber,
        includeHubspotData: true,
      })
        .then(users => {
          return queries.getCheckedSkills(users.map(l => l.id))
            .then(checkedSkillsByUserId => {
              users.forEach(user => {
                user.checkedSkills = checkedSkillsByUserId[user.id]
              })
              return users
            })
        })
    }

    request.loadCheckedForSkills = (userId, skills=[]) => {
      return queries.getCheckedSkills(userId, skills.map(s => s.id))
        .then(checkedSkills =>
          skills.map(skill =>
            Object.assign({}, skill, {
              checked: checkedSkills.includes(skill.id),
            })
          )
        )
    }

    next()
  })
}

function getTitleFromHTML(content) {
  const match = content.match(/<h1[^>]*>([^<]*)<\/h1>/)
  return match ? match[1] : ''
}
