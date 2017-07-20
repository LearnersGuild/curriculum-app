# Static Server

In this exercise you'll play with setting up a simple http-server that serves
static files form a single directory.


## Specs

- All of your HTML pages should link to the `stylesheet`, `javascript` assets
- Your stylesheet asset should set the body's background-color to something
other than white
- Your javascript asset should log something to the console
- The image of a panda should be visible on both your index and about pages
- The index page should link to the about page
- The about page should link to the index page
- All your links to assets should use absolute paths

## Walkthrough

1. Create a new directory and CD into it
1. Create an `index.html` file
1. Create an `about.html` file
1. Create an `style.css` file
1. Create an `script.js` file
1. Create an `panda.jpg` file
1. Install `http-server` globally by running `npm install -g http-server`
1. Open a new terminal in this same directory and run `http-server -c-1 .`
1. Open any of the URLs printed out by the `http-server` command
1. You should see a blank page
1. Edit the index.html page and add some HTML
1. reload
1. Now work toward all the specs

##### Your directory should look like this

```bash
$ ls
about.html index.html script.js style.css panda.jpg
```

##### Get a panda image

```bash
curl http://cdn.history.com/sites/2/2017/03/GettyImages-157278376.jpg > panda.jpg
```


## Solutions

- [deadlyicon](./solutions/deadlyicon)
