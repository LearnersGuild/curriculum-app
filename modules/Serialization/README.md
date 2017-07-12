# Serialization

Serialization is the process of translating data into a format that
can be stored (for example, in a file) or transmitted (for example, across a
network connection) and reconstructed later.

For example if you have this array:

```js
const colors = ['red', 'green', 'blue']
```

You cannot just write this array to a file, or send it across a network
connection. You have to serialize it into a string first.

An example of this is would be converting our array into a comma separated
string (CSV) string like this:

```js
"red,green,blue"
```

Now that we have our data in the form of a serialized string, we can write it
to a file or send it over the network. Then later we can either read this file
or receive this network transmission and deserialize our string back into our
original array. Like this:

```js
"red,green,blue".split(',')
```

All together:

```js
const colorsArray = ['red', 'green', 'blue']

// serializing:
const colorsArrayAsString = colorsArray.join(',')
// colorsArrayAsString is a serialized version of colorsArray

console.log(colorsArrayAsString)
// => "red,green,blue"

// deserializing:
const colorsArray2 = colorsArrayAsString.split(',')
// colorsArray2 should now be identical to colorsArray

console.log(colorsArray2)
// => ['red', 'green', 'blue']
```


## Skills

- Can save data to a file in JSON format, read that file and restore that data, in Node
- Can save data to a file in CSV format, read that file and restore that data, in Node
- Can identify which data types are or are not serializable via JSON from JavaScript


## Search Terms

```
node parse json
node parse csv
node parse xml
```


## Resources

### watching

- https://www.youtube.com/watch?v=uS37TujnLRw

### Reading

- https://en.wikipedia.org/wiki/Serialization
- [Node API for fs.readFileSync()](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options)
- [TutorialsPoint article on Node.js Filesystem](https://www.tutorialspoint.com/nodejs/nodejs_file_system.htm)
- [Documentation for JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)


## Exercises

- Write a node program that can read and write JSON files
- Write a node program that can read and write CSV files

___Note:__ you will probably need to install some npm packages for serializing
in formats other than JSON_
