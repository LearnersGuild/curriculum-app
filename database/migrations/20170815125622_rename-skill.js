const databaseUtils = require('../utils')

exports.up = function(knex, Promise) {
  return databaseUtils.renameSkill(knex, {
    from: "Can describe what a test assertion is",
    to: [
      "Can describe what an assertion is, within tests"
    ],
  })
};

exports.down = function(knex, Promise) {
  return databaseUtils.unrenameSkill(knex, {
    from: "Can describe what a test assertion is",
    to: [
      "Can describe what an assertion is, within tests"
    ],
  })
};
