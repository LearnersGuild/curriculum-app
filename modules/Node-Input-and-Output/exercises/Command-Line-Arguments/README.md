# Command Line Arguments Exercise

In this exercise we're going to explore reading command line arguments given
to a node script.


## Part 1

In a new empty directory create the following files:

#### `./print_arguments.js`

```js
console.log(process.argv)
```

Now run

```sh
node ./print_arguments.js a b c d
```

You should see text output representing an array with 6 members. The first 2
arguments you see may seem odd. The first argument is the fill path to the 
version of node we're running. The second argument is the fill path to 
the `print_arguments.js` script. We can always skip these first two arguments. 
So we might do something like this:


#### `./print_arguments.js`

```js
const argv = process.argv.slice(2)
console.log(argv)
```

Now running the following:

```sh
node ./print_arguments.js a b c d
```

should output:

```
[ 'a', 'b', 'c', 'd' ]
```


## Part 2

In part two we're going to create a script that takes a command as its first
argument and then some input as its second argument. Like this:

```sh
node ./string_manipulator.js reverse "hello world"
dlrow olleh
```

```sh
node ./string_manipulator.js upcase "hello world"
HELLO WORLD
```

```sh
node ./string_manipulator.js capitalize "heLLo woRLd"
Hello World
```

Create the following additional file

#### `./string_manipulator.js`

```js
const command = process.argv[2]
const string = process.argv[3]

switch(command){
  case "reverse":
    console.log(string.split('').reverse().join(''))
    break;

  case "upcase":
    console.log(string.toUpperCase())
    break;

  case "capitalize":
    console.log(
      string
        .toLowerCase()
        .split(/\s+/)
        .map(w => w[0].toUpperCase()+w.slice(1) )
        .join(' ')
    )
    break;
}
```


## Part 3

Try to create a simple calculator that works like this:


```sh
node ./calculator.js add 10 5
15
```

```sh
node ./calculator.js subtract 10 2
8
```

```sh
node ./calculator.js multiply 10 3
30
```

```sh
node ./calculator.js divide 10 2
5
```
