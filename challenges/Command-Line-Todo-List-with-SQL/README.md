# Command Line Todo List with SQL

This benchmark module is the 3rd of a series of modules designed to take the
same problem and make it increasingly more complex as you learn new skills.

This module assumes you've already completed the
[Command Line Todo List With Callbacks](../../modules/Command-Line-Todo-List-With-Callbacks)
module.

In this version we'll move from storing our tasks in a json file to storing them in a Postgresql SQL database.

## Skills

All the skills listed in the
[Command Line Todo List With Callbacks](../../modules/Command-Line-Todo-List-With-Callbacks#skills)
module plus:

- Can describe the general programming term `Defensive Programming`
- Can give two examples of "Defensive Programming" in JavaScript
- Can design a schema and queries for a SQL Database

## Description

See the description in the
[Command Line Todo List](../../modules/Command-Line-Todo-List/#description)
module.

## Specs:

The specs for this module are the same as the specs listed in the
[Command Line Todo List](../../modules/Command-Line-Todo-List/#specs) module
except instead of `fs.readFileSync` and `fs.writeFileSync` you need to use the
`pg` node module to store tasks in a Postgresql database.

##### Additional Specs:


- Tasks are persisted in a Postgres database
- The schema for the database exists in `./schema.sql`
- Your `package.json` contains scripts to setup the database
- A separate test database exists for your tests
- All SQL functions are tested with mocha and chai


## Resources

### Reading

- [Connecting to a PostgreSQL database from Node.js using the pg module](http://nodeexamples.com/2012/09/21/connecting-to-a-postgresql-database-from-node-js-using-the-pg-module/)
- [Diving into PostgreSQL with node-postgres](http://russmatney.com/techsposure/diving-into-postgres-with-node-postgres/)
- [Node-Postgres](https://node-postgres.com/)
- [Connection Syntax when creating a Database object](https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax)
- [PostgreSQL and NodeJS (ignore the Express parts)](http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.WXpXV9PyvIE)
