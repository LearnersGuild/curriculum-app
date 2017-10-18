# Debugging Snapshot - Goal 448

Team Size: 1

## Challenge Rating

This goal will likely be within your ZPD if you ..

- Can build CRUD apps from scratch with Node.js and PostgreSQL
- Have a good understanding of url params vs query params vs body params
- Interested in improving your ability to find the root cause of an error

## Description

This repo will test your ability to detect, analyze, and fix bugs in an existing codebase. You will start by cloning [this repo](https://github.com/GuildCrafts/debugging-snapshot). The code in the repo is in a broken state. The specifications describe the intended behavior of the app.


## Specifications

- Fix the code in the cloned repo such that the application behaves according to the spec listed below
  - Going to the Home Page (`http://localhost:3000/`) should let you see  all the contacts
  - Going to a contact detail page should show the full name of the contact
  - Adding a contact should add a new contact in the database, and redirect to the created contact
  - Clicking on the `Delete` link for a contact should delete the contact
  - Searching for a contact should list all the contacts which match the search string
