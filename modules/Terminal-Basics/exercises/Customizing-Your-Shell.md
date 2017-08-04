# Customizing Your Shell

**Objective**: Effectively utilize a `.bashrc` and `.bash_profile` to customize your shell, create bash aliases and customize your prompt using the `PS1` environment variable

## Shell Initialization Files

Every time you open a new shell, initialization files are run to set up your basic shell environment with any custom configurations you might have. Two of these files are the `.bashrc` (bash resource) and the `.bash_profile`.

According to `man bash`, `.bash_profile` is executed for shells where you've logged in, which is the default for each new terminal window in Mac OS. Both files are loaded when you start a new shell window, but it's easier to maintain configurations in one file. For this example, let's add configurations to the `.bashrc`.

Read more about these files in the following resources:

- [Bash Configurations Demystified](http://dghubble.com/blog/posts/.bashprofile-.profile-and-.bashrc-conventions/)
- [.bash_profile vs .bashrc](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html)

## Exercise: Exporting Environment Variables

When you modified your `PATH`
 using `export PATH`, you only added your custom path in your current session. If you want to keep that custom path, you'll need to add it every time you start a new terminal. You can do this by adding your custom path and `export PATH` command directly to your `.bashrc` to be loaded each time you open a new terminal window.

```bash
# in your .bashrc
PATH=$PATH:~/your-custom-directory/
export PATH
```

Another useful environment variable you'll want to add to your `.bashrc` is your custom editor. This variable will tell bash which program to use when you want to open Javascript files.

```bash
export EDITOR='atom'
# OR
export EDITOR='sublime'
```

Try adding this to your `.bashrc` and then using your editor's command to open a directory:

```bash
# Opens the current working directory using atom
atom .
# OR
sublime .
```

## Exercise: Adding Aliases

Aliases make it easier to reuse commands that you find yourself typing out over and over again. For example, if you are always navigating to the same directory, you could rename the command into an alias:

```bash
# I end up writing this over and over again...
cd ~/Desktop/work_folder/

# So I made an alias for it in my .bashrc!
alias work='cd ~/Desktop/work_folder/'

# Now, wherever I am I can easily get to my work folder using my new work command
work
pwd
# => /Desktop/work_folder/
```

[Read this article](https://www.digitalocean.com/community/tutorials/an-introduction-to-useful-bash-aliases-and-functions) to learn about declaring aliases in BASH and add a few to your `.bashrc`.

## Customizing Your Prompt

You can configure your Bash prompt by using the environment variables `PS1` and `PS2`. Here's some resources to learn about how you can customize your prompt.

- [How to customize your prompt](https://www.digitalocean.com/community/tutorials/how-to-customize-your-bash-prompt-on-a-linux-vps)
- [Customizing Your Bash Prompt](http://www.aimeemarieknight.com/customizing-bash-prompt/)

Try to customize your prompt to show the current time, your username, the current working directory, and the hostname.

## Suggested Search Terms
```
bashrc vs bash_profile
environment variables PS1 and PS2
customize BASH prompt
creating bash aliases
exporting environment variables bash
```
