# Command Line Todo List

## Skills you will need to successfully complete this module

- parsing command line arguments
- JavaScript Contructors
- Modular organization of your code
- Reading and writing to files

### Description

Design a todo-list which manages your tasks from the command line. It should maintain a task list, allowing you to add, list and complete your tasks.

The following commands should be supported by your node script:

| command | description                                            | example usage                            |
|---------|--------------------------------------------------------|------------------------------------------|
| add     | adds the specified                                     | node task.js add Finish reading Flatland |
| list    | lists the incomplete tasks                             | node task.js list                        |
| done    | marks the task with `id` equal to `<task-id>` complete | node task.js done `<task-id>`            |


### Specs:
- [ ] tasks is persisted to a `json` file.
- [ ] node script `task.js` is used to manage the tasks.
- [ ] `list` command has been implemented
- [ ] `add` command has been implemented
- [ ] `done` command has been implemented


### Example Usage

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
```


