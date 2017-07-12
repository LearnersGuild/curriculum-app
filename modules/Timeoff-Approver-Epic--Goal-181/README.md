# Timeoff Snapshot [Approver Epic] (181)

## Skills

- Can add features to a pre-existing Node codebase
- Can describe the general programming term `SOLID`
- Can describe the general programming term `DRY`


## Challenge Rating

This goal will likely be within your ZPD if you...

- Have built simple CRUD apps with node.js
- Interested in tackling a bigger challenge involving a more complex codebase
- Have some familiarity with testing web apps
- Are familiar with Handlebar syntax
- Are familiar with cookies and sessions

## Description

Work on an existing open-source codebase!

This is the first in a series of two snapshot goals. The next is [Timeoff Snapshot [International Epic]][timeoff-2].

This repo is a Timeoff Manager ([original repo](https://github.com/timeoff-management/application) | [live site](http://timeoff.management/)) which is used by small to medium sized companies to manage requests for time off by it's employees.

### Getting Started

1. The first step of approaching any new codebase is to read the [README][repo-readme].
1. Get the code up and running. Checkout the [README][repo-readme] and look for instructions to get a local development copy of the repo up and running and play around with it.
1. Read the browse in the `t` directory. Reading test descriptions (and file names) is a great way to learn what the app can do.
1. Run all the tests locally, to make sure they are passing. (for this repo, there will be several failing tests) Use the `npm test` command.
1. Inspect the [database design][repo-db-design]. Load it up in [sql designer](http://sql.apps.learnersguild.org/) and familiarize yourself with the schema.
1. Finally, look around the other folders and get a sense of how the code is organized, and what the technology stack is: database? front end? test suite? asset management? CSS framework?

## Context

A snapshot goal is based on a medium-to-large-sized repo that is "frozen" in time. It's meant to simulate the experience of developing a feature for an existing "live" open source project.

Use snapshot goals to learn about working with larger code bases, and getting a simulated experience of being in a live sprint to push a set of features across the finish line.

Having learned the basics of CRUD apps, you'll spend as much time reading code as writing it, and having to design creative solutions within a legacy codebase.

## Specifications

**Epic 1: Approver User Role**

This epics adds a new role: approver. Approvers can approve and reject requests, but don't have all of the admin access that an admin has.

- As an Admin when I add a new user, I can choose to make them an approver.
- As an Admin if I try to make someone an approver AND an admin I get an error: "User can only be approver or admin, not both".
- As an approver I can see a menu item in the top navbar next to calendar called "Requests" which links to `/requests`.
- As an admin I can see the requests link as well.
- As an employee without the approver role, I cannot see the requests.
- As an approver or admin, I can see a notification icon next to the request link that shows the number of pending requests.
- As an approver, I can approve and reject requests.
- As an approver, I do not have access to other admin functions (general, department, LDAP configuration, emails audit).

**General**

- Artifact is a fork of the [Timeoff.Management][repo] repo.
- Practice an Agile approach to developing this epic:
  - All user stories are added as issues on GitHub in your fork of timeoff.management and tracked there.
  - Start a [project](https://help.github.com/articles/about-projects/) in GitHub, add all user stories to it, and drag one issue at a time from the `backlog` to `in progress`.
  - Every user story should be in its own clean pull request, with unit and integration tests included. PRs can include one or more user stories, but user stories should _not_ span multiple PRs (don't solve one user story with 2+ PRs).
  - Practice a daily standup with your pair: "what we worked on yesterday, what we are accomplishing today, what's blocking".
- All major features are added via pull requests with a clear description and concise commit messages.
- Code uses a linter and there are no linting errors.
- Code is well formatted with proper spacing and indentation.
- Where appropriate, comments explain unusual code, bug fixes, code assumptions.
- Variables, functions, files, etc. have appropriate and meaningful names.
- Methods are grouped logically or by accessibility. Basic separation of code into logical folders.

### Stretch

**Epic 2: Backend User Role**

This epic adds a new role: backend user. Backend users can access general admin functions, but can't approve/reject requests.

- As an Admin when I add a new user, I can choose to make them a 'backend user'.
- As an Admin if I try to make someone a 'backend user' AND an admin I get an error: "User can only be a 'backend user' or admin, not both".
- As a Backend user, I can't see the 'Requests' menu item but I can see a menu item 'My Requests', which links to `/requests`.
- As a Backend user, when I browse `/requests` I see only my personal requests, not the admin/approver view.
- As a Backend user, I have access to other admin functions (general, department, LDAP configuration, emails audit).

## Resources

The inspiration project:

- [Timeoff Manager](https://github.com/timeoff-management/application) (original repo)
- [Timeoff Manager](http://timeoff.management/) (live app)

Using Sequelize:

- [Sequelize docs: getting started](http://docs.sequelizejs.com/en/latest/docs/getting-started/)
- [Tutorial on Sequelize + Node.js + Express + PostgreSQL](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize) (there will be some differences between PostgreSQL and the databases in this goal, so take everything with a grain of salt)
- Treehouse workshop: [Using SQL with Node.js & Sequelize (44m)](https://teamtreehouse.com/library/using-sql-and-nodejs-with-sequelize)

[repo]: https://github.com/GuildCrafts/timeoff.management/
[repo-readme]: https://github.com/GuildCrafts/timeoff.management/blob/master/README.md
[repo-db-design]: https://github.com/GuildCrafts/timeoff.management/blob/master/docs/db_design.txt

[timeoff-2]: {{ site.url }}{% link _goals/182-Timeoff_Snapshot-International_Epic.md %}
