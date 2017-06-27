# Serialization

Serialization is the process of translating data structures into a format that
can be stored (for example, in a file) or transmitted (for example, across a
network connection) and reconstructed later.

In other words anytime you convert data (like objects, arrays, strings, numbers,
etc.) into a string that can be converted back into those same data strictures,
then you're serializing that data it.


## Skills

- Can save data to a file in JSON format, read that file and restore that data, in Node
- Can save data to a file in CSV format, read that file and restore that data, in Node
- Can identify objects and data that are or are not serializable via JSON


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


## Exercises

- Write a node program that can read and write JSON files
- Write a node program that can read and write CSV files

___Note:__ you will probably need to install some npm packages for serializing
in formats other than JSON_
