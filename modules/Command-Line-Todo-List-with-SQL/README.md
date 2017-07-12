# Command Line Todo List with SQL


## Skills

- Can describe what "Defensive Programming" means
- Can give two examples of "Defensive Programming"
- Can design a schema and queries for a SQL Database

## Description

Create a command line todo-list script, that stores the tasks in a SQL database. You will have to design a schema for the Todo List application such that you can easily add/read/update/delete the tasks.

## Specs:

- Tasks are persisted in a Postgres database
- Schema for the database exists in a file `schema.sql`
- Npm scripts exists to setup the database
- `list` command has been implemented
- `add` command has been implemented
- `done` command has been implemented
- `update` command has been implemented
- Script returns a `Command Not Found` message when the user enters an invalid command
- A separate test database exists for SQL tests
- All SQL functions are tested with mocha and chai


## Example Usage

To add tasks:
```bash
$ node task.js add "Buy milk"
Created task 1.

$ node task.js add "Buy eggs"
Created task 2.

$ node task.js add "Bake cake"
Created task 3.

$ node task.js add "Put groceries in the fridge"
Created task 4.
```

To view incomplete tasks:
```bash
$ node task.js list

ID Description
-- -----------
1  Buy milk
2  Buy eggs
3  Bake cake
4  Put groceries in the fridge

4 tasks.
```

To complete a task:
```bash
$ node task.js done 1
Completed the task 'Buy milk'

$ node task.js done 3
Completed the task 'Buy cake'

$ node task.js list

ID Description
-- -----------
2  Bake eggs
4  Put groceries in the fridge

2 tasks.

$ node task.js vegetate
Sorry: command `vegetate` not recognized :(
Accepted commands are
list
add
update
done
```

