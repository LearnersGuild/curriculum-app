const databaseUtils = require('../utils')

exports.up = function(knex, Promise) {
  return databaseUtils.renameSkill(knex, {
    from: "Can describe the `window` variable is within JavaScript in the Browser",
    to: [
      "Can describe what the `window` variable is within JavaScript in the Browser"
    ],
  })
};

exports.down = function(knex, Promise) {
  return databaseUtils.unrenameSkill(knex, {
    from: "Can describe the `window` variable is within JavaScript in the Browser",
    to: [
      "Can describe what the `window` variable is within JavaScript in the Browser"
    ],
  })
};
