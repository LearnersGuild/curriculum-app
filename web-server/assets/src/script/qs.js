'use strict'

var regex = /([^&=]+)=?([^&]*)/g

module.exports.parse = function(queryString){
  let match
  const params = {}
  if (queryString[0] === '?') queryString = queryString.slice(1)
  while ((match = regex.exec(queryString))) {
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  }
  return params
}

module.exports.stringify = function(params){
  return jQuery.param(params)
}
