# Build Your Own jQuery

## Skills

- Can affectively manipulate the DOM in a Browser

## Suggested Resources

- MDN!

### Reading

- DOM Manipulation
  - [document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
  - [document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
  - [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
- [JS Interview Questions](http://www.thatjsdude.com/interview/dom.html), specifically:
  - [What are the different ways to get an element from DOM?](http://www.thatjsdude.com/interview/dom.html#queryDOM)
  - [Fastest way to Query DOM](http://www.thatjsdude.com/interview/dom.html#fastestDOMQuery)

### Watching


## Exercises

- Copy the fauxQuery skeleton code from [here](./fauxQuery.js) and:
  - Implement the fauxQuery selection logic, that returns a `FauxQuery` object
    - Implement the `FauxQuery` object that exposes the following functions:
      - `constructor( NodeList )` - creates a `FauxQuery` object that receives a `NodeList` as an input
      - `.toArray()` - returns an array of `FauxElement`s
      - `.first()` - returns the first `FauxElement` in the set of elements contained by the `FauxQuery`
      - `.last()` - returns the last `FauxElement` in the set of elements contained by the `FauxQuery`
      - `.append( htmlContentString )` - appends the `htmlContentString` to the end of every element contained by the `FauxQuery`
      - `.appendTo( target )` - appends all of the elements contained by the `FauxQuery` to the end of the target `FauxElement`
  - Implement the `FauxElement` object that exposes the following functions:
    - `addClass( className )` - adds `className` to the element's class list
    - `removeClass( className )` - removes `className` from the element's class list (no op if the class does not exist)
    - `attr( attrName, attrValue )` - sets the value of the specified `attrName` to `attrValue`
    - `attr( attrName )` - returns the value of the specified `attrName`
    - `.html()` - returns the html contained by the `FauxElement`
    - `.text()` - returns the value of the first text node child of the `FauxElement`
    - `.find( selector )` - returns a `FauxQuery` object containing any descendants of the `FauxElement` object that match the specified `selector`
