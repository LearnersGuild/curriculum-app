# Read and Write JSON files

**Objective**: Learn NodeJS's filesystem functions `readFileSync`, `readFile`, `writeFileSync` and `writeFile`


### Exercise


### Part 1
Write an executable node script `file-io-sync.js` that reads a JSON file synchronously and also writes to a file synchronously. The JSON file to be read is provided [here](../data/reading-and-writing.json)

Example Usage Output:
```
$ node file-io-sync.js
Going to read file synchronously ...
{"name": "Learners Guild", "city": "Oakland"}

Going to write file synchronously ...
Wrote file
Contents of File Written: Learners Guild

```

### Part 2
Write an executable node script `file-io-sync.js` that reads a JSON file asynchronously and also writes to a file asynchronously. The JSON file to be read is provided [here](../data/reading-and-writing.json)

Example Usage Output:
```
$ node file-io-async.js
Going to read file asynchronously ...
{"name": "Learners Guild", "city": "Oakland"}

Going to write file asynchronously ...
Wrote file
Contents of File Written: Oakland

```
