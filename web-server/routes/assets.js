const Path = require('path')
const express = require('express')
const assetBuildDirectoryPath = Path.resolve(__dirname, '../assets/build')
const fontsDirectoryPath = Path.resolve(__dirname, '../assets/fonts')

module.exports = app => {

  app.use('/fonts', express.static(fontsDirectoryPath))

  if (process.env.NODE_ENV === 'production') {

    const fs = require('fs')
    fs.readdir(assetBuildDirectoryPath, (error, files) => {
      if (error) throw error
      app.locals.stylesheetAssetPath =
        '/assets/'+files.find(path => path.match(/browser\..*\.css$/))
      app.locals.javascriptAssetPath =
        '/assets/'+files.find(path => path.match(/browser\..*\.js$/))
    })

    app.use('/assets', express.static(assetBuildDirectoryPath, {
      etag: true,
      maxAge: '1d',
      index: false,
    }))

  }else{

    const webpack = require('webpack')
    const webpackMiddleware = require('webpack-middleware')
    const webpackConfig = require('../webpack.config')

    const webpackMiddlewareConfig = {
      // publicPath is required, whereas all other options are optional

      noInfo: false,
      // display no info to console (only warnings and errors)

      quiet: false,
      // display nothing to the console

      lazy: true,
      // switch into lazy mode
      // that means no watching, but recompilation on every request

      watchOptions: {
        aggregateTimeout: 300,
        poll: true
      },
      // watch options (only lazy: false)

      publicPath: "/assets/",
      // public path to bind the middleware to
      // use the same as in webpack

      index: "index.html",
      // The index path for web server, defaults to "index.html".
      // If falsy (but not undefined), the server will not respond to requests to the root URL.

      headers: { "X-Custom-Header": "yes" },
      // custom headers

      mimeTypes: { "text/html": [ "phtml" ] },
      // Add custom mime/extension mappings
      // https://github.com/broofa/node-mime#mimedefine
      // https://github.com/webpack/webpack-dev-middleware/pull/150

      stats: {
        colors: true
      },
      // options for formating the statistics

      reporter: null,
      // Provide a custom reporter to change the way how logs are shown.

      serverSideRender: false,
      // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.
    }

    app.locals.stylesheetAssetPath = '/assets/browser.css'
    app.locals.javascriptAssetPath = '/assets/browser.js'
    app.use(webpackMiddleware(webpack(webpackConfig), webpackMiddlewareConfig))
  }
}
