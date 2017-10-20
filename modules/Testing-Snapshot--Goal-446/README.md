# Testing Snapshot (446)

## Skills

- Can write end-to-end tests for an existing HTTP API using the chai-http library
- Can describe the differences between `unit`, `integration` and `end-to-end` tests
- Can create different configuration files for multiple environments (test, development, production) in Node
- Can add features to a pre-existing Node codebase

## Challenge Rating

This goal will likely be within your ZPD if you...

- Can build CRUD apps from scratch with Node.js and PostgreSQL
- Are interested in implementing tests in an existing project

## Description

You will start by cloning a starter app the has full CRUD functionality. From here, you will write tests using `chai-http`.

### Setting Up Your Snapshot

#### Forking the repo

1. Fork the [Contacts starter repo](https://github.com/GuildCrafts/contacts-snapshot-starter) and clone the forked repo
1. Create and checkout a new branch for this goal, something like `testing`
    ```
    $ git checkout -b testing
    ```
1. Push your branch to the remote repo on GitHub
    ```
    $ git push -u origin testing
    ```
1. Follow the install instructions in the README of the starter repo
1. Get started on the specs!

#### Cloning the Repo

If you are unable to fork the repo (you may have forked the repo already, and Github does not allow you to fork a repo twice), paste the following in the terminal

1. Clone the [Contacts starter repo](https://github.com/GuildCrafts/contacts-snapshot-starter) by running
```bash
git clone git@github.com:GuildCrafts/contacts-snapshot-starter.git testing-snapshot
```

1. Remove the existing git tracking folder -
```bash
cd testing-snapshot
rm -r .git
```

1. Setup the `testing-snapshot` folder as a fresh new git project, and push it to github
```bash
git init
git add .
git commit -m "first commit"
git remote add origin <link-to-project-on-github>
git push origin master
```

## Specifications

- All tests use the `contacts_test` database
- All "End to End" and Integrations tests are setup such that the database tables are truncated, and seeded before each test run.
- End to End testing: Test the http routes exposed in the server
  - You have `chai-http` installed
  - A test for the `/` GET route to make sure that the correct page is getting rendered and all the contacts are being received from the database
  - A test for the `/contacts/new` GET route that checks that the correct page is rendered
  - A test for the `/contacts` POST route that saves contact data to the database
  - A test for the `/contacts/:contactId` GET route that makes sure the correct data is returned
  - A test for the `/contacts/:contactId` DELETE route that makes sure the correct data is deleted
  - A test for the `/search` GET route that checks that the search is returning the correct data and rendering the correct page

- Integration testing: Write tests to test all the database functions
  - For the file `src/models/contacts.js`
  - A test to test the `create` function
  - A test to test the `findAll` function
  - A test to test the `findById` function
  - A test to test the `destroy` function
  - A test to test the `search` function

- UI Tests: Use a headless browser testing libary (like PhantomJS)
  - As a user when I navigate to the `/contacts/new` page I should see a form which lets me create a new contact
  - As a user when I submit the form on the `/contacts/new` page, a new contact should be created, and I should be navigated to the `/contacts/:contactId` page for the created contact.
  - As a user when I navigate to the `/` page, I should see a list of contacts on the page
  - As a user when I click on the delete link of a contact, it should confirm my delete action, and if I confirm the action, it should delete the contact.
  - As a user when I visit the home page `/`, and I search for a contact, it should show me a list of contacts


## Resources

- http://cmme.org/tdumitrescu/blog/2014/02/node-sql-testing/
