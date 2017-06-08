# Todo List

Create a simple Todo List function, that is able to let you add/remove/complete items in the list.

## Example Usage
```javascript
var list = new TodoList()
list.add({task: 'Do laundry'})
// => [{id:1, task: 'Do laundry', status: 'INCOMPLETE'}]
list.add({task: 'Call mom'})
// => [{id: 1, task: 'Do laundry', status: 'INCOMPLETE'},
       {id: 2, task: 'Call mom', status: 'INCOMPLETE'}]
list.items()
// => [{id: 1, task: 'Do laundry', status: 'INCOMPLETE'},
       {id: 2, task: 'Call mom', status: 'INCOMPLETE'}]
list.completeItem(1)
// => [{id: 1, task: 'Do laundry', status: 'COMPLETE'},
       {id: 2, task: 'Call mom', status: 'INCOMPLETE'}]
list.deleteItem(2)
// => [{id: 1, task: 'Do laundry', status: 'COMPLETE'}]
```

Implement the function `TodoList` below so that all the use cases for the todolist works.
```javascript
var TodoList = function() {


}
```
