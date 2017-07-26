require('../environment')

const Path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const env = process.env.NODE_ENV
const development = env === 'development'
const production = env === 'production'

const paths = {}
paths.root = Path.resolve(__dirname, '..')
paths.webServer = __dirname
paths.entry = paths.webServer+'/assets/src/browser.js'
paths.build = paths.webServer+'/assets/build'

const extractCSS = new ExtractTextPlugin(
  production ? 'browser.[hash].css': 'browser.css'
)

module.exports = {
  target: 'web',
  entry: paths.entry,
  output: {
    path: paths.build,
    publicPath: '/assets',
    filename: (production ? 'browser.[hash].js': 'browser.js'),
  },
  plugins: [
    new CleanWebpackPlugin([
      paths.build+'/browser*.js',
      paths.build+'/browser*.css',
    ]),
    extractCSS,
  ],
  devtool: development ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: extractCSS.extract([ 'raw-loader', 'sass-loader' ]),
      }
    ]
  }
}
