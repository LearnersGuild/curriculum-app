# Pipes

In this exercise you'll write a node script that can read from
STDIN or "Standard In" and write to STDOUT or "Standard Out"


## Part 1

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

#### `./passthrough.js`

```js
const fs = require('fs')
console.log('passthrough.js start')
console.log(fs.readFileSync('/dev/stdin').toString())
console.log('passthrough.js end')
```


Now in the terminal compare the following commands

```sh
cat ./something.txt
```

vs.

```sh
cat ./something.txt | node ./passthrough.js
```

You should see the exact same output except the second command's output was
wrapped with `passthrough.js start` & `passthrough.js end`.


Now try pipping other things into your `passthrough.js` script. It
should print out whatever you give it.

```
ls -la | node ./passthrough.js`
```


You should also try running `passthrough.js` without piping anything to it. If
you do this you'll essentially be given an empty prompt. It might seem like
your shell is frozen or something but its just reading STDIN from your terminal.
To get out of this either hit `control-c` to abort the script or `control-d` to
close and complete your input to STDIN.

Like this:

Run `node ./passthrough.js` and it should print `passthrough.js start` and then
it starts capturing everything you type, you can type whatever you want, hit
enter, type whatever. When you're done just hit `control-d` and what you typed
is sent to your node script's STDIN.

## Part 2

Okay now let's do something more useful than just print out out whatever we're
given. In part two you're going to create a script that counts words in the text
you pass to it through STDIN (Standard In).

Create the following additional files

#### `./word_count.js`

```js
const fs = require('fs')
const numberOfWords = fs.readFileSync('/dev/stdin')
  .toString()
  .split(/\s+/)
  .length
console.log(numberOfWords+' words')
```


now run the following commands

```sh
cat ./something.txt | node ./word_count.js
```

```sh
echo "i love cheese" | node ./word_count.js
```

Your script should print out the number of "words" it found in it's given input.

## Part 3

Try to create the following scripts

#### `./upcase.js`

This script should take whatever is piped to STDIN and print out an all upper
cased version of the string.

```sh
echo "ooooh weeee can do" | node ./upcase.js

OOOOH WEEEE CAN DO
```

#### `./reverse.js`

This script should take whatever is piped to STDIN, and print out a reversed
version of the string.

```sh
echo "ooooh weeee can do" | node ./reverse.js

od nac eeeew hoooo
```

___TIP:___ try using `process.stdout.write(output)` instead of `console.log(output)`
to avoid adding a line return to your output_

## Part 4

Now try stringing your scripts together


```sh
echo '!emosewa era sepip ooooow' | node ./upcase.js | node ./reverse.js
```

or

```sh
cat something.txt | node ./reverse.js | node ./upcase.js
```
