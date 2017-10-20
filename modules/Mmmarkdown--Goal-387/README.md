# Mmmarkdown (387)

## Skills

- Can build a full stack application using Express
- Can use an external JavaScript library
- Can describe what an HTML templating library is
- Can use an HTML templating library like pug or handlebars

## Challenge Rating

This goal will likely be within your ZPD if you...

- Can read and write HTML & CSS
- Can write object-oriented JavaScript and execute it on both the browser and with Node.js
- Have used git and GitHub to do basic tasks like forking, cloning, making commits, and pushing to a remote repository
- Are interested in learning the Node.js programming environment
- Are interested in building full-stack web apps with Node.js
- Are interested in using the popular [Express.js][express] framework

## Description

Build a [markdown][] editor app using Node.js and the popular Express.js framework. The final product will be similar to (but a lot simpler than) this app: http://dillinger.io/.

When people talk about "full-stack web development", usually what they mean is the process of building applications that run on both a _server_ and a _client_.

In this goal, you'll build a "full-stack" web app with code that runs in both environments.

If this is your first time working with [Express.js][express], you may want to take some time up front to get oriented. Review the [Resources](#resources) to get started.

### Recommended Pace

It is recommended (but not required) that you follow along with the day-by-day pace included here. These are designed to help you break down the problem into more manageable parts so that you can pace your work appropriately and leave time to explore the [learning resources](#resources).

Each day, pay attention to the **terms & concepts** highlighed in **bold**. By the end of the day, you should have a better idea of what they mean and how to use them. In other words, aim to be able to answer the question "what is X?" for yourself.

Depending on how much support you and your team need, balance solo and team time. Make sure to always review the day's work with your team and share important learnings.

#### Day 1

With your team, complete the specs in [Stage 1](#stage-1) to set up your initial Express app and learn:

- how a **web server** program is set up
- how browsers send **requests** to servers and servers reply with a **response**
- what a **static file** is in the context of the web
- what it means for a server to be **listening** on a particular **port**

#### Day 2

With your team, complete the specs in [Stage 2](#stage-2) to organize your view files with the [Pug][] templating engine. You'll be learning and practicing:

- what an **HTML template** is and how it works
- how to split HTML templates into smaller components using **includes**
- how templating is similar to **string interpolation**
- how to include and organize your **static files** like CSS

#### Day 3

With your team, complete the specs in [Stage 3](#stage-3) to implement the "MVP" (Minimum Viable Product) feature: being able to write and render markdown text. You'll be learning and practicing:

- how to install a JavaScript **package** for use in the browser
- what **markdown** is and how it is used
- what it means to **render** markdown text to HTML
- how to listen for **key press events** in the browser
- how to **send data** from a browser to the server
- how to use Node.js to **read and write to a file**

#### Day 4

With your team, complete the specs in [Stage 4](#stage-4) to add the more advanced feature of the product: managing multiple files. You'll be learning and practicing:

- what **routes** are and how to use them in Express.js
- how to **create new files** programmatically with Node.js
- how to use **iteration** in your HTML templates
- what **cookies** are and how to use them in Express.js

#### Day 5

This day is open! There are a lot of new things to learn this week, so use this last day to revisit the areas you least understand.

Use the [Resources](#resources) where applicable, but don't limit yourself to them! There are plenty of great resources online that you can use.

## Context

Most web applications have code that runs on the _client_ (i.e. a web browser) and the _server_ (e.g. a Node.js web application). If you're just learning web development, you may have only worked on one side of this divide.

This goal will help you learn to tie these two pieces together: to create a "full-stack" web app that runs code on _both_ the client and the server.

## Specifications

These are the basic specs for "Mmmarkdown", broken into 5 stages. If you complete these specs, try taking on some of the [Stretch specs](#stretch).

#### Stage 1

Setup the repo and file structure, install and configure [Express][], and get a basic server running.

- Repo (your artifact) is created on GitHub
- Repo follows a conventional file structure for an Express.js app:
  - `package.json`: standard for any Node.js app; includes package info and lists dependencies
  - `app.js`: your Express server, with all routes defined
  - `views/`: for storing your Pug HTML templates
  - `public/`: for storing static files like CSS and images
  - `README.md`: includes overview of your repo
- Express server can be started with `$ node app.js`
- Server renders a page at the root route (`/`) that looks like the [mockup](#mockups) but does not have any functionality - it is just a static page
- All package dependencies are defined in `package.json`
- The artifact produced is properly licensed, preferably with the [MIT license][mit-license]

#### Stage 2

Build out the template structure with [Pug][] for a single-file editor. Don't worry about multiple files for now, or implementing the markdown rendering.

- Pug is installed and set up for HTML templating
- View template files are created in the `/views` subdirectory
- Main view file is called `index`
- Includes are created for the different "components" of the main view:
  - Sidebar (shows list of files)
  - Header (shows current filename, word count, and save button)
  - Editor (shows markdown editor pane)
  - Preview (shows rendered markdown)
- CSS is organized into one or more files in the `public/` directory
- CSS declarations are well-named and formatted (consider using this [small guide](http://tinystride.com/articles/organized-css-a-small-guide/))

#### Stage 3

Setup real markdown rendering so that writing in the left panel updates the right panel, and make the "Save" button work.

- Marked is installed
- Markdown text written in the "Editor" pane is rendered in the "Preview" pane automatically
- Preview is updated every time text in the editor changes
- Clicking the "Save" button saves the markdown text in the editor to a file in a subdirectory of the server `data/`
- The markdown file in `data/` is loaded and used as the starter text in the editor (in other words, the last saved text is loaded by default)

#### Stage 4

Build out multiple-file functionality, and use cookies to remember the last opened file.

- Users can create more than one markdown file
- Markdown files are listed in the sidebar
- Clicking on a file name in the sidebar will open the file in the "Editor" and render it in the "Preview", replacing the current file.
    You can accomplish this using _either_ server-side rendering + custom routes for each file _or_ with JavaScript by making AJAX calls to retreive data from the server and update the DOM. See the "Multiple vs. Single Page" below for more context.
- Clicking on the "New File" button in the sidebar lets users create a new file and prompts for the file name either using the archaic built in `prompt()` method OR better yet, building it into the UI in another beautiful way.
- Clicking on a file in the sidebar will navigate to the page, load the file contents into the editor, and render them in the preview
- Markdown content can still be saved to files in `data/`, with one file in `data/` for each file in the sidebar
- Most recently edited file is tracked using a cookie
- When visiting the root route (`/`), users are redirected to the file they last edited

**Multiple vs. Single Page**

One option for showing multiple files is to have a separate URL for each file, and let the server render the view (also called **server-side rendering**). This way, each file would have its own URL, named after its filename. For example, if the markdown file is called `Todos.md`, its URL would be `http://localhost:3000/todos`. Then, you could add links to your HTML pointing to this URL.

Alternatively, you could use AJAX calls to do **client-side rendering** by requesting the file contents with JavaScript and using them to update the page without needing to navigate to a new page with a separate URL.

#### Stage 5

No stage 5! Move into stretch specs, or use the time to polish up your code.

### Mockups

Try to mimic the following mockup as closely as you can. Note that some of the features in the mockup are part of the [stretch specs](#stretch) - you don't have to build those yet.

<img alt="mmmarkdown-mockup" width="800" src="https://cloud.githubusercontent.com/assets/709100/24804622/01ad8ffe-1b7d-11e7-91f4-a60303a79ff8.png">

##### with comments

<img alt="mmmarkdown-mockup-with-comments" width="800" src="https://cloud.githubusercontent.com/assets/709100/24805262/2824fd32-1b7f-11e7-9690-5576477151c6.png">

#### New File

<img alt="mmmarkdown-mockup-new-file" width="800" src="https://cloud.githubusercontent.com/assets/709100/24805253/23e24c84-1b7f-11e7-8820-5f5e022da97b.png">

### Stretch

If you complete all of the specs listed above (the checkboxes), there's no reason to stop there! Try building more advanced features with these stretch specs.

- Clicking the trash can icon...
  - Deletes the file from the `data/` folder
  - Shows the sidebar updated without the deleted file
- "Word count" section in the header displays the word count for the currently open file

##### Use a Database

Instead of using files for persistence, set up a PostgreSQL database.

- Database schema SQL (using PostgreSQL syntax) is included in the file `schema.sql`.
- Database query functions are defined in the file `db.js`.
- `db.js` includes a function to list all files
- `db.js` includes a function to list all files ordered by their latest edit time (most recent first)
- `db.js` includes a function to show file with particular name
- `db.js` includes a function to get text content of file with particular name
- `db.js` includes a function to list created date of all files
- `db.js` includes a function to list every file name and its word count

## Resources

Use these resources to fill in the gaps in your skills and knowledge as you find them. There is more here than you can do in a week, so focus on the areas that are in your zone of proximal development (ZPD).

##### Tools

- [Express.js][express]: "Fast, unopinionated, minimalist web framework for Node.js"
- [Pug][]: "robust, elegant, feature rich template engine for Node.js"
- [Marked][]: "A full-featured markdown parser and compiler, written in JavaScript. Built for speed."

##### Guides

- The official [Express.js Guide][express-guide] #express #nodejs
- The official [Pug Getting Started][pug-getting-started] #pug #html
- MDN: [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) #html #dom #js
- MDN: [Guide to Event Handlers](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers) #dom #js

##### Courses

- Treehouse: [Express Basics (3h)](https://teamtreehouse.com/library/express-basics) #express #nodejs
- Treehouse: [Understanding Express Middleware (23m)](https://teamtreehouse.com/library/understanding-express-middleware-2) #express #middleware
- Code School: [Building Blocks of Express.js (5h)](https://www.codeschool.com/courses/building-blocks-of-express-js) #express #js

##### Books

- [Eloquent JavaScript](http://eloquentjavascript.net) #js
  - Especially [Chapter 20: Node.js](http://eloquentjavascript.net/20_node.html) #nodejs

##### Tutorials

- [JavaScript.info](https://javascript.info/) #js

[express]: https://expressjs.com/
[express-guide]: https://expressjs.com/en/guide/routing.html
[pug]: https://pugjs.org/
[pug-getting-started]: https://pugjs.org/api/getting-started.html
[marked]: https://www.npmjs.com/package/marked

[markdown]: https://daringfireball.net/projects/markdown/syntax

[mdn-localstorage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

[mit-license]: https://opensource.org/licenses/MIT
