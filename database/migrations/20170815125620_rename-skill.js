const databaseUtils = require('../utils')

exports.up = function(knex, Promise) {
  return databaseUtils.renameSkill(knex, {
    from: "Can globally ignore commonly ignored file patterns in a global `.gitignore` file",
    to: [
      "Can tell git to ignore file patterns in a global `.gitignore` file"
    ],
  })
};

exports.down = function(knex, Promise) {
  return databaseUtils.unrenameSkill(knex, {
    from: "Can globally ignore commonly ignored file patterns in a global `.gitignore` file",
    to: [
      "Can tell git to ignore file patterns in a global `.gitignore` file"
    ],
  })
};
