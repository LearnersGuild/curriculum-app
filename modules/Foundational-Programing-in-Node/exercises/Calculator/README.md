# Calculator

In this exercises were going to explore the basics of writing JavaScript in
node.

This exercises if part of the [Foundational-Programing-in-Node](../../) module.


## Stage 1

1. Create a new folder
2. `cd` into that folder
3. create the following files:


`add.js`

```js
module.exports = function(a, b){
  return a + b
}
```

`subtract.js`

```js
module.exports = function(a, b){
  return a - b
}
```

`multiply.js`

```js
module.exports = function(a, b){
  // write this code yourself
}
```
`divide.js`

```js
// try to write all the code for this file yourself
// model it after the other files
```

`calculator.js`

```js
var add = require('./add')
var subtract = require('./subtract')
var multiply = require('./multiply')
var divide = require('./divide')

console.log('10 + 5 = '+add(10, 5))

```

4. run the `calculator.js` script by running this command

```sh
node ./calculator.js
```

You should see the following output:

```
10 + 5 = 15
```


5. Add some more examples that use all 4 of our math functions
6. Make sure your attempts at `multiply.js` and `divide.js` work correctly



___Important:__ make sure you save this folder so your instructor can review
it with you_
