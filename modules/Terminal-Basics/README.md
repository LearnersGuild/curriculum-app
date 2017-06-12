# Terminal Basics


## Skills

- Can describe, read and write environment variables
- Can describe, read and their $PATH
- Can use: cd, ls, cat, pwd, touch, mkdir, rmdir, rm, cp
- Can explain what a filesystem path is
- Can explain absolute and relative file paths
- Can open a file or directory in their editor
- Can open a directory in the finder from the Terminal
- Can open a file in its default app from the Terminal
- Can use: ctrl-c, ctrl-a, ctrl-e
- Can split screen their terminal window
- Can effectively utilize a .bashrc and .bash_profile
- Can create and has some bash aliases
- Can and has customized their PS1

## Glossary of Terms

| Term | Explanation |
| ---- | ----------- |
| Shell | a shell is a program that has a command line interface that you give commands that can be processed by an operating system.
| Terminal | The terminal is wrapper program, like iTerm2, that runs the Shell program and provides a user interface.
| BASH | BASH (Bourne-Again Shell) is a kind of UNIX shell and is the most used shell since 1989.
| UNIX | An operating system that comes with a bunch of small, composeable tools (or programs) like `ls`, `grep`, `cd`, `mkdir`, and more. These UNIX tools can be used alone or they can be used together.
| Environment Variable | Environment variables store information about your current shell or environment that you're working in. They're used to answer questions like `What is my current working directory?` `echo $PWD` or `What is the current user name?` `echo $USER`. When you start managing a web app, you'll use environment variables to store private variables you don't want displayed in your code for the whole world to see.|
| Arguments | Arguments are additional pieces of information you can send to a command, for example the command `echo` takes whatever you want to print to STDOUT as its argument. In this example, the string 'Hello there' is the argument given to the command: `echo 'Hello there!'`|
| Standard Output (STDOUT) | Most commands will print to STDOUT, which you will see printed to your terminal. You can also redirect the output of a command and send it to a file or even send it as an argument to a new command. |
| Standard In (STDIN) | The counterpart to STDOUT, STDIN is the source of an input for a program or command line tool. STDIN is any input or text entered into the shell and passed as an argument to a program. |
| Command | A command is a program that is executed in the shell, some examples are `echo`, `ls`, `cd`, `open`. |


## Suggested Search Terms

```
unix path introduction
difference between unix shell terminal console
introduction to bash shell
absolute vs relative paths
unix change directories
osx open files terminal
unix customizing bash profile
unix creating files directories
unix copying files directories
unix listing files directories
unix renaming files directories
unix viewing contents of a file
```

## Resources

- [Learn Shell](http://www.learnshell.org/)
- [Command Line Crash Course](https://learnpythonthehardway.org/book/appendixa.html)
- [Codecademy Learn the Command line](https://www.codecademy.com/learn/learn-the-command-line)
- [UNIX Tutorial for Beginners](http://www.ee.surrey.ac.uk/Teaching/Unix/)
- [UNIX File Operations](http://heim.ifi.uio.no/gisle/staging2/drupalprimer/unix/unix03.html)
- [BASH Redirection Cheat Sheet](http://www.catonmat.net/download/bash-redirections-cheat-sheet.pdf)
- http://guide.bash.academy/
- http://linuxcommand.org/learning_the_shell.php
- https://www.tutorialspoint.com/unix/
- http://freeengineer.org/learnUNIXin10minutes.html
- https://www.learnenough.com/command-line-tutorial


## Exercises

0. [ ] [Environment-Variables-And-PATH](./exercises/Environment-Variables-And-PATH.md)
0. [ ] [Basic-BASH-Commands](./exercises/Basic-BASH-Commands.md)
0. [ ] [Terminal-Shortcuts](./exercises/Terminal-Shortcuts.md)
0. [ ] [Customizing-Your-Shell](./exercises/Customizing-Your-Shell.md)

