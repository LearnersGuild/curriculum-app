global.jQuery = global.$ = require('./bootflat/js/jquery-1.10.1.min.js')
require('./bootflat/js/bootstrap.min.js')
require('./behaviors.js')

console.log('browser.js loaded V2')
require('./browser.sass')
const { loadDigest } = require('./digest')
