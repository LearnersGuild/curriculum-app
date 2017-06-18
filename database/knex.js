const config = require('../knexfile')[process.env.NODE_ENV]
const knex = require('knex')(config);

module.exports = knex
