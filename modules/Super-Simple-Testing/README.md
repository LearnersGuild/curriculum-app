# Super Simple Testing

In this module we'll explore simple, manual ways you can test your code. This is meant to be a precursor to testing your code with testing libraries like `Mocha` or `Jasmine`.

## Skills

- Can describe what a test is
- Can use `console.assert()` to write simple tests
- Can write a function to test another function
- Can write a test script to test one or more functions in source code file
- Can run tests in a console
- Can run tests from the Terminal

## Glossary of Terms

- test
- expected value
- actual value

## Examples

A cornerstone of all testing is assertions. The value of all tests comes down
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
// add_test.js
var add = require('./add')

console.assert(typeof add === 'function', 'add is not a function')
console.assert(add(10, 5) === 15, 'expected add(10, 5) to return 15')
```

## Exercises

- Pick some functions that you've written already and write some tests using `console.assert()` for them. Make sure to test both expected inputs/outputs as well as unexpected/invalid inputs.

## Suggested Resources

- https://developer.mozilla.org/en-US/docs/Web/API/console/assert
- https://nodejs.org/api/assert.html
