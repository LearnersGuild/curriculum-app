# Adding A Custom `bin` Directory

In this exercise we're going to modify your shell configuration to allow you to
create and run custom shell commands. This configuration involves two major
steps:

1. Add a directory to your `$path`
2. Put executable files in that directory

_If you want to push yourself in this exercise, skip the guide below and see if
you can complete this exercise but just googling how to do it._

## Completion Criteria

You've completed this exercise when:

- [ ] You have a directory somewhere on your system dedicated to custom shell
commands. I recommend `~/bin`
- [ ] There is at least one executable file within that directory
- [ ] You can run those commands from any directory in a new terminal window

## Search Terms

```
os x terminal create directory
os x chmod
os x chmod make executable
os x add directory to path
```

## Resources

- https://en.wikipedia.org/wiki/Shebang_(Unix)

## Step By Step Guide


0. Create a directory in your home directory called `bin`
0. `touch` a file in that directory called `saymyname`
0. Use the `chmod` command to make this file executable
0. Put `echo $USER` inside of the `saymyname` file
0. Test to make sure this command works by trying to run `saymyname`
