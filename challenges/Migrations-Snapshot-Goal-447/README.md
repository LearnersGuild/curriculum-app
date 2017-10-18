# Migrations Snapshot - Goal (447)

## Skills

- Can describe what a SQL migration is
- Can describe why we need SQL migrations
- Can take an existing SQL schema, and convert it into migrations
- Can create automated scripts to `reset`, `migrate`, and `seed` a SQL database

## Description

You will start by cloning a starter app which already has a database schema defined. You will then modify the project such that the schema will be managed by database migrations.

### Setting Up Your Snapshot

1. Fork & clone the [SQL Migrations Starter Repo](https://github.com/GuildCrafts/sql-migrations-snapshot)
1. Follow the install instructions in the README of the starter repo

## Specifications

- Use the [node-db-migrate](https://github.com/db-migrate/node-db-migrate) library to add migrations to your project. Read the [documentatation](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/).
- Ensure that your migration files are written in SQL.
- Using the library above to create a migration for the SQL defined in the `src/models/db/schema/schema.sql` file
- An npm script `db:migrate` exists which migrates the db to the latest migration
- An npm script `db:migration:create` exists which lets you create a new migration
- An npm script `db:reset` exists which drops, creates and migrates the database
- Create a migration for a table called `user`. Table should contain the following fields
  - id
  - first_name
  - last_name
  - email

## Resources

- [Schema migration](https://en.wikipedia.org/wiki/Schema_migration)
- [Using Migration Scripts in Database Deployments](https://www.red-gate.com/simple-talk/sql/database-administration/using-migration-scripts-in-database-deployments/)
