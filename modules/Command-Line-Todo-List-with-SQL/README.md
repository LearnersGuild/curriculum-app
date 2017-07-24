# Command Line Todo List with SQL

This benchmark module is the 3rd of a series of modules designed to take the
same problem and make it increasingly more complex as you learn new skills.

This module assumes you've already completed the
[Command Line Todo List With Callbacks](../../modules/Command-Line-Todo-List-With-Callbacks)
module.

In this version we'll move from storing out tasks in a json file to storing our
tasks in a Postgresql SQL database.

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


