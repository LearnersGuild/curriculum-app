# Phase 2 -> 3 Assessment

This is the assessment for moving from phase 2 to phase 3. There are 4 parts to the assessment.

To get started, create a new repository called `phase-2-assessment`. Do all of your work in this repo and submit it as your solution.

Skills covered:

- Programming in JS
- Node.js
- HTTP
- HTTP Apps
- HTML & CSS
- The Browser
- SQL

## General Requirements

- [ ] Solution is in a public repository called `phase-2-assessment`
- [ ] Solution repository has 4 folders: `part-1`, `part-2`, `part-3`, and `part-4`

## Part 1: Simple web app

Build a very basic web app to perform basic calculations on numbers supplied in the URL.

Use Express. You don't need to use an HTML templater like EJS or Pug, just respond with plain text.

The web server should provide the following routes:

```
/zero
/add
/subtract
/multiply
/double/:number
/square/:number
```

All routes just respond with a plain text response. The `/add`, `/subtract`, and `/multiply` routes all take a query string with two numbers `a` and `b`.

Example requests and responses:

```
request: GET /zero
response: 0

request: GET /add?a=4&b=8
response: 12

request: GET /subtract?a=9&b=2
response: 7

request: GET /multiply?a=5&b=6
response: 30

request: GET /double/9
response: 18

request: GET /square/4
response: 16
```

### Requirements

- [ ] All files are stored under the `part-1/` folder
- [ ] All dependencies are specified in a `package.json` folder
- [ ] Web server can be started with `npm start` command
- [ ] GET requests to the `/zero` route respond with plain text `0`
- [ ] GET requests to the `/add` route add the two numbers provided in the query string variables `a` and `b` and respond with the result
- [ ] GET requests to the `/subtract` route subtract the value of the query string variable `b` from the query string variable `a` and respond with the result
- [ ] GET requests to the `/multiply` route multiply the two numbers provided in the query string variables `a` and `b` and respond with the result
- [ ] GET requests to the `/double/:number` route doubles the number provided in the URL (in place of `:number`) and responds with the result
- [ ] GET requests to the `/square/:number` route calculates the square of the number provided in the URL (in place of `:number`) and responds with the result

## Part 2: Script to fetch GitHub data

Write an executable Node.js script that will list all repositories for a given GitHub user.

To handle authentication, provide a GitHub username and authentication token as environment variables.

Example usage:

```
$ GH_USERNAME=myusername GH_TOKEN=authtoken node repos.js

GitHub repos for myusername:

- repo_one
- repo_two private
- repo_three fork
- repo_four
- ...
```

In the above example, you would need to replace `myusername` with your GitHub username and `authtoken` with your GitHub authentication token.

The script should then print out a list of each repo name along with the string `private` if it is a private repo and `fork` if it is a fork.

### Requirements

- [ ] All files are stored under the `part-2/` folder
- [ ] No third party packages are used (code only uses the builtin Node.js library modules)
- [ ] Script requires that the environment variables `GH_USERNAME` and `GH_TOKEN` are set, and will throw an error if they are not
- [ ] Running script with valid username and token will print a list of all repositories for the given user
- [ ] The list of repositories printed includes the repository name
- [ ] The list of repositories printed notes private repos with the string `private`
- [ ] The list of repositories printed notes forked repos with the string `fork`

## Part 3: Grocery store interface

Create a front-end only site for an online grocery store where users can choose from a list of items and add them to a cart.

You only need to write HTML, CSS, and JavaScript. No web server is required.

You'll need some mock grocery item data to populate the page with. Either create your own or copy data from [this CSV][grocery-data]. Add at least 10 items in 3+ sections.

### Wireframes

#### Grocer page

The main page shows a 3 part layout: header, sidebar, and main content area.

![main page](https://user-images.githubusercontent.com/709100/26839845-3dd07942-4ab2-11e7-944e-2da0acd695bf.png)

#### Modal

Clicking on the "Cart" button opens the cart modal.

![modal](https://user-images.githubusercontent.com/709100/26839839-3b224ad6-4ab2-11e7-8bb4-24e715ca53bd.png)

### Requirements

- [ ] All files are stored under the `part-3/` folder
- [ ] No third party CSS or JS libraries are used (all code must be written from scratch)
- [ ] Main page is in a file called `index.html`
- [ ] CSS is written in a separate file (or files)
- [ ] JS is written in a separeate file (or files)

#### Layout

- [ ] Page has a header with the site title "Grocer" and a button "Cart"
- [ ] Site title "Grocer" is aligned to the left
- [ ] "Cart" button is aligned to the right
- [ ] Page header is full-width
- [ ] Page header is fixed to the top of the page
- [ ] Page has a "Sections" sidebar
- [ ] Page sidebar shows all sections for grocery items
- [ ] Page sidebar is fixed to the side of the page
- [ ] Page has a main content area showing each of the grocery items
- [ ] Main content lists all grocery items' name, price, and an "Add to cart" button
- [ ] Main content organizes all grocery items by section

#### Behavior

- [ ] Clicking on a section in the "Sections" sidebar will jump to that section
- [ ] Clicking on "Add to cart" will add the item to the user's cart (doesn't need to be persisted - can just store in a JS array)
- [ ] Clicking on "Add to cart" will update the number displayed next to the "Cart" button to show the total number of items in the user's cart
- [ ] Clicking on the "Cart" button will show the cart modal with a list of all items added
- [ ] Clicking on the "Clear" button in the cart modal removes all items from the cart
- [ ] Clicking on the "X" button in the cart modal closes the modal
- [ ] The "Total" in the cart modal shows the calculated sum of all item prices

## Part 4: SQL challenges

Build a small database for an online grocery store. Same idea as in part 3, but focused on the database side.

Design a database to store **grocery items**, **shoppers**, and shoppers' **orders**.

You'll need to design the schema and write some SQL statements to insert and query data. Look closely at the requirements to determine how to design your schema.

Use the provided [grocery item data][grocery-data] to seed your grocery items table.

### Requirements

- [ ] All files are stored under the `part-4/` folder
- [ ] Database schema (all `CREATE TABLE` statements) is defined in a file `schema.sql`
- [ ] SQL script to insert seed data and/or load from CSV is created in a file `load-data.sql`
- [ ] Data from [grocery item data][grocery-data] CSV is loaded in `load-data.sql` script
- [ ] All queries are included in a file `queries.sql`

#### Queries

Write SQL queries (and save them in `queries.sql`) to find...

- [ ] The IDs, names, prices, and sections for all grocery **items**
- [ ] The names of all grocery **items** in the `produce` section
- [ ] The IDs and prices of all grocery **items** that cost less than $10.00, ordered from lowest to highest price
- [ ] A count of all grocery **items** in the `frozen` section
- [ ] The IDs, names, and emails of all **shoppers**
- [ ] The IDs and order dates for the 10 most recent **orders**
- [ ] The shopper's name who made the most recent **order**
- [ ] The names, quantities, and prices of all items for a specific **order** (you choose the ID of the order to use)
- [ ] The sum of all prices for items for a specific **order** (you choose the ID of the order to use)
- [ ] The names of all **shoppers** with the number of **orders** each shopper has placed
- [ ] The names and IDs of all **items** ordered _across all orders_ by a specific **shopper** (you choose the ID of the shopper to use)

[grocery-data]: https://gist.github.com/lg-bot/5b76b9910eaef705226dbcd876d35de2
