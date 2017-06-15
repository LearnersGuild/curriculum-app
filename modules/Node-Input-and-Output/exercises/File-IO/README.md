# File IO Exercise

In this exercise we'll be going through how to synchronously read from and write
to files in Node. You'll find it is highly encouraged to read from and write
to files asynchronously in node. Lets ignore that wise advice for now as we
learn the basics. Later on "in the real world" we'll explore reading from and
writing to files asynchronously.

## Step 1

In step one you're going to write a node script that takes a file path as its
first argument, reads that file, and writes it contents to STDOUT.

In a new empty directory create the following files:

#### `./something.txt`

```
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

#### `./kitty_cat.js`

```js
const fs = require('fs')
console.log('kitty_cat.js start')
console.log(fs.readFileSync(process.argv[2]).toString())
console.log('kitty_cat.js end')
```

Now in the terminal compare the following commands

```sh
cat ./something.txt
```

vs.

```sh
node ./kitty_cat.js ./something.txt
```

You should see the exact same output except the second command's output was
wrapped with `kitty_cat.js start` & `kitty_cat.js end`.

Now if you remove those unneeded `console.log`s like this:

#### `./kitty_cat.js`

```js
const fs = require('fs')
console.log(fs.readFileSync(process.argv[2]).toString())
```

You have essentially cloned the `cat` command. `node ./kitty_cat.js whatever_file`
should work just like `cat`.

## Step 2

In step two were going to read from one file and copy it's contents into another
file.


Create the following additional files

#### `./copy_a_to_b.js`

```js
const fs = require('fs')
fs.writeFileSync('./b.txt',
  fs.readFileSync('./a.txt').toString()
)
```

Create `a.txt` like this:

```sh
cp ./something.txt ./a.txt
```

Create `b.txt` like this:

```sh
touch b.txt
```

Double check that `a.txt` has all that Lorem ipsum in it by running `cat a.txt`

And double check that `b.txt` is empty by running `cat b.txt`

Ok now run `node ./copy_a_to_b.js`. You shouldn't see any output but when you
`cat b.txt` again you should see that the content from `a.txt` was copied into
`b.txt`.


## Step 3

Try to create the following scripts


#### `./read_config.js`

The `./read_config.js` should read `./config.json` and output its contents in a
human readable format.

Create `./config.json` with:

```json
{
  "name": "Betty Holberton",
  "bio": "Frances Elizabeth \"Betty\" Holberton was one of the six original programmers of ENIAC, the first general-purpose electronic digital computer. Wikipedia",
  "born": "March 7, 1917, Philadelphia, PA",
  "died": "December 8, 2001, Rockville, MD"
}
```

When you run `node ./read_config.js` it should output:

```
Betty Holberton
Frances Elizabeth "Betty" Holberton was one of the six original programmers of ENIAC, the first general-purpose electronic digital computer. Wikipedia
Born: March 7, 1917, Philadelphia, PA
Died: December 8, 2001, Rockville, MD
```

___HINT__: you'll need to read `./config.json` and then `JSON.parse` that string._
