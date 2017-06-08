# Super Simple Testing

In this module we'll explore simple, manual ways you can test your code. This
is meant to be a precursur to testing your code with testing libraries like
`Mocha` or `Jasmine`.



## Skills

- [ ] can describe what a test is
- [ ] can use `console.assert` to write simple tests



## Exercises

A corner stone of all testing is assertions. The value of all tests comes down
to asserting what should be true and failing the test if any of your assertions
are not true.

Here is an example:

```js
var add = function(a, b){
  return a + b
}

console.assert(add(10, 5) === 15, 'expected add(10, 5) to return 15')
```

You can also do this in two different files:

```js
// add.js
const add = function(a, b){
  return a + b
}

module.exports = add
```

```js
var add = require('./add')

console.assert(typeof add === 'function', 'add is not a function')
console.assert(add(10, 5) === 15, 'expected add(10, 5) to return 15')
```

