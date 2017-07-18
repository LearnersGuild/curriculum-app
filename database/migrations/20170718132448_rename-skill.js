const databaseUtils = require('../utils')

exports.up = function(knex, Promise) {
  return databaseUtils.renameSkill(knex, {
    from: "Can read a JavaScript backtrace",
    to: [
      "Can read a JavaScript stacktrace"
    ],
  })
};

exports.down = function(knex, Promise) {
  return databaseUtils.unrenameSkill(knex, {
    from: "Can read a JavaScript backtrace",
    to: [
      "Can read a JavaScript stacktrace"
    ],
  })
};
