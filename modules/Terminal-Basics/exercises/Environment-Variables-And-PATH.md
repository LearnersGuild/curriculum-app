# Environment Variables and PATH
**Objective**: Understand environment variables and $PATH

## Why use a shell?
So, why would you want to use a shell?
  - Manage files and directories
  - Start and stop different processes and programs
  - Run local servers
  - Manage operating system security with users and permissions
  - Use the command-line program `git` to save and commit your work!

## Environment Variables
Environment variables (or env vars) are variables that store values and can be used in the terminal. You can set and reset them as needed, and they are usually used to build shell scripts.

Env vars are generally written in all caps. To set a new variable, type the name of the variable followed by an = sign and the value you want to store. Don't use any spaces between the variable and the value.

Set a new variable in your shell:

```bash
  EXAMPLE_VARIABLE='Variables are so cool!'
```

Access the new variable with the command `echo` and place a `$` in front of the variable. The `$` means you are accessing the variable instead of setting it. The `echo` command is a very simple UNIX program that just prints its arguments to the standard output (STDOUT), so you will see the value printed on the next line.

Access your newly set variable:

```bash
  echo $EXAMPLE_VARIABLE
```

This variable will keep the same value as long as you're in the same shell. If you open a new terminal window, you'll see that variable is not available anymore.

## PATH
When you type a command to the shell, the shell needs to find the program to use to execute the command. For example, if you type `/bin/ls` the shell will know to look for the `ls` command stored in the bin directory, but if you just use the command `ls` it will need to search for it in the `$PATH` variable

Look at your `$PATH` variable:

```bash
  echo $PATH
```

You'll notice the `$PATH` is colon-delimited, between each colon is a new directory path. By default, most users have the following directory paths in their `$PATH` variable:

```bash
  ./bin:/usr/bin:usr/local/bin
```

### Exercise
Let's practice adding a new `bin` directory to your home directory and then adding this directory to your `$PATH`. Once you've added it to your `$PATH`, you can save executable programs in that directory for your shell environment to find and execute.

Start by navigating to your home directory using the command `cd ~`. The command `cd` is for change directory and let's you change the folder you're currently working in from your shell.

Then, we'll create a new folder in your home directory with the `mkdir` command, which means make directory:

```bash
mkdir bin
```

Now, let's take a look at what directories we have in the home folder. Use the command `ls` to list all visible directories. You should see your new directory in the list!

Ok, we have a directory to add to the `$PATH`, let's `echo $PATH` now so we can compare it with the new `$PATH` to see where `~/bin` gets placed after we add it.

To add `~/bin` to your `PATH`, you:
  1. Set the environment variable by using the `=`
  1. Use the value of the current `PATH` first
  1. Separate the current path from your new directory using a `:`
  1. Add in the new directory name using its absolute path with `~/`
  1. Permanently add it to your `PATH` using the `export` command

```bash
PATH=$PATH:~/bin/
export PATH # without this you will lose this change when you open a new shell window
```

Now if you `echo $PATH` you should see `/Users/your_username/bin`. This is the absolute path we get by using `~/` before the directory. Learn more about absolute paths versus relative paths by watching this [BASH Basics video](https://youtu.be/eH8Z9zeywq0?t=506).

Research these links and topics to learn more about the `$PATH`. While you're researching, complete the list of tasks below to check your understanding.

- [Customizing your Environment](http://heim.ifi.uio.no/gisle/staging2/drupalprimer/unix/unix08.html)
- [UNIX Filesystem Overview](https://fsl.fmrib.ox.ac.uk/fslcourse/unix_intro/files.html)
- [What is my PATH and how do I modify it?](https://kb.iu.edu/d/acar)
- [Understanding Environment Variables and the Unix Path](https://cbednarski.com/articles/understanding-environment-variables-and-the-unix-path/)
- [How to add a path to PATH?](https://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path)

0. [ ] Add a new directory to your PATH
0. [ ] Add a new directory to the beginning of your PATH
0. [ ] Add a new directory to the end of your PATH
0. [ ] Export an environment variable and access it in a new shell window
0. [ ] Run the command `ls /usr/bin` and identify some programs you recognize. If you don't recognize any of them, try researching a few to see what they do!

### Suggested Search Terms
`introduction unix PATH`
`precedence unix PATH`
`add new path unix`
`UNIX filesystem introduction`
