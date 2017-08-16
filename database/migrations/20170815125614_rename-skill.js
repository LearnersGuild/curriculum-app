const databaseUtils = require('../utils')

exports.up = function(knex, Promise) {
  return databaseUtils.renameSkill(knex, {
    from: "Can add `./node_modules/.bin` to your `$PATH`",
    to: [
      "Can add `./node_modules/.bin` to your `$PATH`, in the shell"
    ],
  })
};

exports.down = function(knex, Promise) {
  return databaseUtils.unrenameSkill(knex, {
    from: "Can add `./node_modules/.bin` to your `$PATH`",
    to: [
      "Can add `./node_modules/.bin` to your `$PATH`, in the shell"
    ],
  })
};
