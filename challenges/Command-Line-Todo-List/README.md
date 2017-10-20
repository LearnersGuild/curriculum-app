# Command Line Todo List

This benchmark module is the 1st of a series of modules designed to take the
same problem and make it increasingly more complex as you learn new skills.
Below are the 2nd and 3rd modules for the Command Line Todo List benchmark.

2. [Command Line Todo List With Callbacks](../../modules/Command-Line-Todo-List-With-Callbacks)
2. [Command Line Todo List With SQL](../../modules/Command-Line-Todo-List-with-SQL)

## Skills

- Can write an executable script in Node
- Can write a Node script that parses complex command line arguments
- Can write a complex Node script with modular organization of the code
- Can use `fs.readFileSync` to read from a file in Node
- Can use `fs.writeFileSync` to write to a file in Node
- Can write unit tests with mocha in Node

## Description

Write a command line script called `tasks` that allows the user to manage a list
of tasks from the terminal.

Your `tasks` command should support the following sub-commands:

| command  | description                                            | example usage                       |
|----------|--------------------------------------------------------|-------------------------------------|
| add      | adds the specified task                                | ./tasks add Finish reading Flatland |
| list     | lists the incomplete tasks                             | ./tasks list                        |
| complete | marks the task with `id` equal to `<task-id>` complete | ./tasks complete `<task-id>`        |
| delete   | deleted the specified task                             | ./tasks delete `<task-id>`          |


In this 1st version the data for your tasks should be saved to a file called
`tasks.json`.


## Specs

- Your command should be called `tasks`
- The `tasks` command file should have a shebang pointing to `node`
- The `tasks` command file should have execute permissions
- Tasks are persisted to a `json` file using `fs.readFileSync` and `fs.writeFileSync`
- The `list` command is implemented in `./commands/list.js`
- The `add` command is implemented in `./commands/add.js`
- The `complete` command is implemented in `./commands/complete.js`
- The `delete` command is implemented in `./commands/delete.js`
- Add tests using Mocha and Chai for all functions
- User receives an error message if they enter an invalid command
- Your program should create the `tasks.json` if the file doesn't exist
- `tasks.json` is ignored and not checked into your Git repository

## Example Usage



##### Listing tasks when you have no tasks

```bash
$ ./tasks list

ID Description
-- -----------

You have 0 tasks
```

##### Adding some tasks

```
$ ./tasks add "Buy milk"
Created task 1
```

```
$ ./tasks add "Buy eggs"
Created task 2
```

```
$ ./tasks add "Bake a cake"
Created task 3
```

```
$ ./tasks add "Put groceries in the fridge"
Created task 4
```

##### Listing tasks when you have some

```bash
$ ./tasks list

ID Description
-- -----------
1  Buy milk
2  Buy eggs
3  Bake cake
4  Put groceries in the fridge

You have 4 tasks
```

##### Completing a task

```
$ ./tasks complete 1
Completed task 1: 'Buy milk'
```

##### Deleting a task

```
$ ./tasks delete 2
Deleted task 2: 'Buy eggs'
```

##### Listing after completing and/or deleteing tasks

```bash
$ ./tasks list

ID Description
-- -----------
3  Bake cake
4  Put groceries in the fridge

You have 2 tasks
```


## Resources

### Reading

- [Docs for fs.readFileSync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options)
- [Docs for fs.writeFileSync](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)
