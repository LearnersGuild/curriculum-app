# Todo List

Create a `TodoList` constructor that has methods to `add`, `remove`, and `complete`
items in the todo list.

## Example Usage

```js
var list = new TodoList()

list.add('Do laundry')
// => [{id:1, task: 'Do laundry', complete: false}]

list.add('Call mom')
// => [{id: 1, task: 'Do laundry', complete: false},
//     {id: 2, task: 'Call mom', complete: false}]

list.items()
// => [{id: 1, task: 'Do laundry', complete: false},
//     {id: 2, task: 'Call mom', complete: false}]

list.completeItem(1)
// => [{id: 1, task: 'Do laundry', complete: true},
//     {id: 2, task: 'Call mom', complete: false}]

list.deleteItem(2)
// => [{id: 1, task: 'Do laundry', complete: true}]
```

Create the `TodoList` constructor below so that all the use cases for the
todolist works.

```js
var TodoList = function() {


}
```
