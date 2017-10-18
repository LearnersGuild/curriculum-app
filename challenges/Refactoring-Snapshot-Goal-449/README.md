# Refactoring Snapshot - Goal (449)

Team Size: 2

## Challenge Rating

This goal will likely be within your ZPD if you ..

- Can build CRUD apps following good coding practices - code organization, file naming, RESTful routing, variable naming etc
- Interested in taking on the challenge of working with an unfamiliar codebase.

## Description

This repo will test your ability to refactor an existing code base, identify non-standard patterns, and change the code to comply with standard practices.

## Specifications

- All routes for cities & reviews follow the RESTful routing convention.
- The `server.js` file only contains initialization code, and no logic/definitions
- Move the `public` directory to the root of the project
- The database folder is organized according to the MVC pattern
  - all funcion names describe the VERB/ACTION taking place
  - file names indicate the RESOURCE being worked on
  - Eg: path of the users file should be `./src/models/db/users.js`
- All files inside the views folder are organized according to the RESOURCE
  - folder names represent the RESOURCE.
  - file name represent the VERB/ACTION
- All variable names are camel cased, and the name indicates what they represent
- Delete all unused code / files

## Stretch Specs

- Add a configuration for the project to include config for the database, server (port)

## Helpful tips when refactoring

- Always make incremental changes.
  - For example, if you're refactoring a file which involves moving the file to a new path, instead of moving all the functions in the file to the new file at the same time, move a single function at a time.
  - Delete the old function, so that running your app will throw a `ReferenceError` for the moved function.
  - Update the callers of that moved function in your codebase, test your app by triggering the path of the newly moved function.
  - If all goes well and the function works as expected, you can move on to the next function. Repeat the above steps
  - Trust me, this will reduce the amount of mental energy you have to spend to get things to work.
