# Testing Snapshot (446)

## Skills

- Can write end-to-end tests for an existing HTTP API using the chai-http library
- Can explain the difference between unit vs integration vs end-to-end tests
- Can create different configuration files for multiple environments(test, development, production)
- Can add features to an existing codebase

## Challenge Rating

This goal will likely be within your ZPD if you...

- Can build CRUD apps from scratch with Node.js and PostgreSQL
- Are interested in implementing tests in an existing project

## Description

You will start by cloning a starter app the has full CRUD functionality. From here, you will write tests using `chai-http`.

### Setting Up Your Snapshot

1. Fork & clone the [Contacts starter repo](https://github.com/GuildCrafts/contacts-snapshot-starter)
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

## Specifications

- [ ] You have `chai-http` installed
- [ ] A test for the `/` GET route to make sure that the correct page is getting rendered and all the contacts are being received from the database
- [ ] A test for the `/contacts/new` GET route that checks that the correct page is rendered
- [ ] A test for the `/contacts` POST route that saves contact data to the database
- [ ] A test for the `/contacts/:contactId` GET route that makes sure the correct data is returned
- [ ] A test for the `/contacts/:contactId/delete` GET route that makes sure the correct data is deleted
- [ ] A test for the `/search` GET route that checks that the search is returning the correct data and rendering the correct page
