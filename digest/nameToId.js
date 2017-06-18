module.exports = name =>
  name
    .replace(/[\/ #]/g, '-')
    .replace(/`/g, '')
