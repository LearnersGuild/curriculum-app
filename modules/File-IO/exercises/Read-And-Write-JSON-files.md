# Read and Write JSON files

**Objective**: Learn NodeJS's filesystem functions `readFileSync`, `readFile`, `writeFileSync` and `writeFile`


### Exercise


### Part 1 - Synchronous
Write an executable node script `file-io-sync.js` that reads a JSON file synchronously, and then writes to a separate .txt file synchronously. The JSON file to be read is provided [here](../data/reading-and-writing.json)

Example Usage Output:
The script reads the JSON file, extracts the name, and writes the name to 'name.txt'
```
$ node file-io-sync.js
Going to read file synchronously ...
{"name": "Learners Guild", "city": "Oakland"}

Going to write file synchronously ...
Wrote file 'name.txt'
Contents of file written: Learners Guild

```

### Part 2 - Asynchronous
Write an executable node script `file-io-async.js` that reads a JSON file asynchronously and also writes to a separate .txt file asynchronously. The JSON file to be read is provided [here](../data/reading-and-writing.json)

Example Usage Output:
The script reads the JSON file, extracts the name, and writes the name to 'city.txt'
```
$ node file-io-sync.js
Going to read file asynchronously ...
{"name": "Learners Guild", "city": "Oakland"}

Going to write file asynchronously ...
Wrote file 'city.txt'
Contents of file written: Oakland

```
