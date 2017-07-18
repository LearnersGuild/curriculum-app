const fs = require('fs-extra')
const databaseUtils = require('../utils')

exports.up = function(knex, Promise) {
  return fs.readFile(__filename.replace(/\.js$/, '.diff'))
    .then(buffer => {
      databaseUtils.migrateSkillsDiff(knex, buffer.toString())
    })
};

exports.down = function(knex, Promise) {
  return Promise.reject(new Error('Irreversible Migration'))
};
