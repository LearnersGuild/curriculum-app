const databaseUtils = require('../utils')

exports.up = function(knex, Promise) {
  return databaseUtils.renameSkill(knex, {
    from: "Can describe the difference between a JavaScript Promise being fulfilled vs. rejected",
    to: [
      "Can describe the difference between a JavaScript Promise being fulfilled and it being rejected"
    ],
  })
};

exports.down = function(knex, Promise) {
  return databaseUtils.unrenameSkill(knex, {
    from: "Can describe the difference between a JavaScript Promise being fulfilled vs. rejected",
    to: [
      "Can describe the difference between a JavaScript Promise being fulfilled and it being rejected"
    ],
  })
};
