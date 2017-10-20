# Simple Book Store - Goal (69)

## Skills

- Can build a RESTful API using Express
- Can build a SQL schema for a given problem definition
- Can use the fetch API to make HTTP requests
- Can write end-to-end tests for an existing HTTP API using the chai-http library

## Challenge Rubric

This goal will likely be within your ZPD if you...

- Can build basic websites with HTML & CSS
- Can add behavior to a website with JavaScript
- Are familiar with SQL and relational databases like [PostgreSQL][]
- Are familiar with JavaScript promises
- Are interested in building full-stack web applications with frameworks like [Express][]
- Are interested in learning CRUD (Create, Read, Update, Delete) relational database interactions
- Are interested in server-side templating with tools like [Pug][] or [EJS][]

## Description

You've been tasked with building a web app for a local bookstore to help them manage their inventory.

Create a simple content management system that allows users to view, add, delete, and update books. Books entered in the system can be viewed in a list, as a single entry on its own page, or searched for using basic searches (by title, author, or genre).

To implement this system, you'll need to use (among other things)...

- a _web application framework_ (we recommend [Express][])
- a _database_ (we recommend [PostgreSQL][])
- a tool for server-side _HTML templating_ (we recommend [Pug][])

Don't sweat the UI design too much. If you want to add some quick and easy styles so that it doesn't look _too_ terrible, use a library like [Bootstrap][] or [Pure.css][pure-css].

Also, don't spend too much time coming up with book data if you need some seed data to work with. Use a fake data generator like [Faker](https://github.com/marak/Faker.js/) or just borrow a list from a data store like [this CSV](https://gist.github.com/jaidevd/23aef12e9bf56c618c41).

## Context

Many of the seemingly fancy apps on the web have functionality that can be reduced to just 4 simple operations: Create, Read, Update, and Delete (or CRUD for short). At their core, they are really just ways to perform these operations on some resource.

- Writing a new tweet on Twitter? That's a _create_ operation.
- Searching for photos tagged with `#kittenmittens` on Instagram? That's a _read_ operation.
- Editing your profile information on LinkedIn? That's an _update_ operation.
- Removing that 2am rant-post from Facebook? That's a _delete_ operation.

Like the steel frame of a skyscraper, _CRUD_ is the skeleton around which web applications are built: it's not very sexy, but you have to know how to do it.

In this goal, you'll be applying the CRUD pattern to the real-world system of a bookstore.

_Note: `PUT/PATCH` and `DELETE` requests can be a little difficult to work with, because there is not a lot of HTML support for them. If you haven't used these request types before, you should do some reading and research. Start with these SO questions: [using PUT in HTML form](http://stackoverflow.com/questions/8054165/using-put-method-in-html-form) and [PUT vs POST in REST](http://stackoverflow.com/questions/630453/put-vs-post-in-rest)._

## Specifications

#### General
- All views are rendered on the server using server-side templates written with [Pug][] or [EJS][]
- Web server can be started with the command `npm start`
- Test suite can be run with the command `npm test`
- All features are added as pull requests
- All pull requests are approved by at least one other member of the team using GitHub's [pull request review feature](https://help.github.com/articles/about-pull-request-reviews/) (so that your teammate's approval is of the PR is documented)
- Variables, functions, files, etc. have appropriate and meaningful names.
- Functions are small and serve a single purpose
- Code uses a linter and there are no linting errors.
- Code is well tested and all tests are passing.
- The artifact produced is properly licensed, preferably with the [MIT license](https://opensource.org/licenses/MIT).

#### Stories
- Books have a title, author, and genre
- Users can add books into the bookstore system via an admin page (_create_)
- Users can see a list of books on the home page (_read_)
- Users can edit a book's title, author, or genre (_update_)
- Users can delete a book from the bookstore (_delete_)
- Users can search for books by title OR by author OR by genre (_read_)
- Users can view book details on a book detail page (_read_)
- Lists of books are always paginated in groups of 10
- Book detail view is linked to from the listing and search pages
- Search results are presented in a new page

#### HTTP Verbs
Appropriate HTTP verbs are used for CRUD actions (for reference, follow the guidelines explained in [this article](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#restful))
- `GET` requests are only used for _read_ actions
- `POST` requests are only used for _create_ actions
- `PUT` or `PATCH` requests are only used for _update_ actions
- `DELETE` requests are only used for _delete_ actions

### Stretch

- App is deployed and live on the web (consider using Heroku)
- All source code is written with ES6
- Users have their own account and can sign up and sign in/out
- Users have one of three roles: `admin`, `clerk`, `reader`
- Users with role `reader` can only view and search for books
- Users with role `clerk` can edit books in addition to viewing/searching
- Users with role `admin` can perform all actions (create, read, update, delete) with books
- Books have a price, cover image, publisher, and ISBN number

## Resources

Guides and tutorials

- [Getting started](https://expressjs.com/en/starter/installing.html) and [Guide](https://expressjs.com/en/guide/routing.html) sections of Express.js site
- [Building a Node.js REST API with Express](https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6#.qlp1sijze)
- [Designing a RESTful API With Node and Postgres](http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/)
- [PostgreSQL and NodeJS](http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/)
- [Building a Simple CRUD Application with Express and MongoDB](https://zellwk.com/blog/crud-express-mongodb/) - uses MongoDB instead of PostgreSQL, but the rest of it is still useful
- [Using RESTful URLs and Actions](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#restful)

Tools and libraries

- SQL modeling designer: http://ondras.zarovi.cz/sql/demo/
- [Express][] as a lightweight web server framework
- [PostgreSQL][] for data persistence
- [Pug][] or [EJS][] for server-side templating
- [Bootstrap][] or [Pure.css][pure-css] for styling the UI

[express]: http://expressjs.com/
[postgresql]: https://www.postgresql.org/
[pug]: https://pugjs.org/
[ejs]: http://www.embeddedjs.com/
[bootstrap]: http://getbootstrap.com/
[pure-css]: https://purecss.io/
