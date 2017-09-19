# GIT WORKFLOW

This document is a suggested git workflow for working on an issue.

## Prior setup

- You have followed the setup instructions for LOS/ECHO and Curriculum
- You have forked each of the repositories to your local machine.
- Your origin is set to your fork and your upstream is set to the original repo on GuildCrafts.

Example of your remotes setup.
```
origin https://github.com/<your-handle>/curriculum.git (fetch)
origin  https://github.com/<your-handle>/curriculum.git (push)
upstream  https://github.com/GuildCrafts/curriculum.git (fetch)
upstream  https://github.com/GuildCrafts/curriculum.git (push)
```

## Workflow

You have selected an issue and you are now ready to begin work. Head to your local cloned copy of the repo.

`git checkout master`

`git fetch upstream`

`git reset --hard upstream/master`

`git checkout -b <number of issue>`

#### You working on the issue

![alt text](https://media.giphy.com/media/13GIgrGdslD9oQ/giphy.gif)

#### Everything goes well and you're ready to commit

![alt text](http://gifimage.net/wp-content/uploads/2017/08/success-gif-9.gif)

`git status`

- If you have any new files run `git add --all -N` first to stage the new file(s)

`git add --all -p`

`git commit -m`

`git fetch upstream`

`git log`

- You want to make sure that you can see `upstream/master` in your log

If this isn't present

  `git rebase upstream/master`

`git push --set-upstream origin <your-current-branch>`

Now you can head over to the repo on github and open up a pull request!