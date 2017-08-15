const databaseUtils = require('../utils')

exports.up = function(knex, Promise) {
  return databaseUtils.renameSkill(knex, {
    from: "Can write a test script to test one or more functions in source code file",
    to: [
      "Can write a test script that tests one or more functions in source code file"
    ],
  })
};

exports.down = function(knex, Promise) {
  return databaseUtils.unrenameSkill(knex, {
    from: "Can write a test script to test one or more functions in source code file",
    to: [
      "Can write a test script that tests one or more functions in source code file"
    ],
  })
};
