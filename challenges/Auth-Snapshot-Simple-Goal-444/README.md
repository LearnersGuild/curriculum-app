# Auth Snapshot Simple - Goal (444)

## Skills

- Can build a HTTP API with simple authentication using bcrypt and session cookies
- Can describe what encryption is
- Can describe why encryption is important when dealing with sensitive information like passwords
- Can build a SQL schema for a given problem definition
- Can describe the difference between HTTP authentication and authorization

## Challenge Rating

This goal will likely be within your ZPD if you...

- Can build CRUD apps from scratch with Node.js and PostgreSQL
- Are interested in implementing auth in an existing project

## Description

You will start by cloning a starter app the has full CRUD functionality. From here, you will implementing auth using `express-session`, `bcrypt`.

### Setting Up Your Snapshot

1. Fork & clone the [Contacts starter repo](https://github.com/GuildCrafts/contacts-snapshot-starter)
1. Create and checkout a new branch for this goal, something like `auth`
    ```
    $ git checkout -b auth
    ```
1. Push your branch to the remote repo on GitHub
    ```
    $ git push -u origin auth
    ```
1. Follow the install instructions in the README of the starter repo
1. Get started on the specs!

## Specifications

- Authentication
  - Create a signup page with a form (links to the login page)
  - Create a login page with a form (links to the signup page)
  - Redirect users who are not logged in to the login page (Make sure not logged in users can't see any of the pages or data other than the login and signup pages)
  - Create a user table in the database
  - When a user signs up, a new user row is created in the user table
  - When a user logs in, their username and password are validated in the user table. If the username/password combo doesn't exist or is invalid, the user receives an error.
  - Passwords are encrypted with `bcrypt`
  - [express-session][express-session] is used to store sessions on the server side. Notice the differences between storing sessions on client side(using [cookie-session][cookie-session] vs storing sessions on the server side(using `express-session`).
- Authorization
  - A user should have a `role` associated to it. The values are `admin` or `regular`.
  - Only a user with an `admin` role should be able to create a new contact. If the logged in user is not an `admin`, going to the route `/contacts/new` should return a status code 403.
  - Only a user with an `admin` role should be able to delete a contact. If the logged in user is not an `admin`, going to the route `/contacts/delete/:contactId` should return a status code 403. The delete links on the page should not be shown if the logged in user is not an `admin`.

## Stretch Specs

- If you use [express-session], use a persistent session store https://www.npmjs.com/package/connect-pg-simple to store the sessions (instead of the default in memory store that `express-session` uses)
- A user should be able to have more than one role. For example, a user can have roles `reporter`, and `editor`, which would give them access to the resources that are available to both those roles.
- Add [schema migrations](https://en.wikipedia.org/wiki/Schema_migration) for your database using https://github.com/theoephraim/node-pg-migrate

## Resources
- https://en.wikipedia.org/wiki/HTTP_403

[express-session]: https://github.com/expressjs/session
[cookie-session]: https://github.com/expressjs/cookie-session
