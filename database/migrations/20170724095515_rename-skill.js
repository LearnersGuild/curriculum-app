const databaseUtils = require('../utils')

exports.up = function(knex, Promise) {
  return databaseUtils.renameSkill(knex, {
    from: "Can use describe and use `Promise.race()` in JavaScript",
    to: [
      "Can describe and use `Promise.race()` in JavaScript"
    ],
  })
};

exports.down = function(knex, Promise) {
  return databaseUtils.unrenameSkill(knex, {
    from: "Can use describe and use `Promise.race()` in JavaScript",
    to: [
      "Can describe and use `Promise.race()` in JavaScript"
    ],
  })
};
