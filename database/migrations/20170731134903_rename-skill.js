const databaseUtils = require('../utils')

exports.up = function(knex, Promise) {
  return databaseUtils.renameSkill(knex, {
    from: "Can examine HTTP request from the Chrome Developer Tools",
    to: [
      "Can examine an HTTP request from the Chrome Developer Tools"
    ],
  })
};

exports.down = function(knex, Promise) {
  return databaseUtils.unrenameSkill(knex, {
    from: "Can examine HTTP request from the Chrome Developer Tools",
    to: [
      "Can examine an HTTP request from the Chrome Developer Tools"
    ],
  })
};
