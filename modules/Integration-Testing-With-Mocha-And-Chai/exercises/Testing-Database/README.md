# Exercise: Integration Tests with a Database

Write tests for a set of functions that interact with a database storing address book information.

Use the starter code in `db.js` and `schema.sql` to get your database up and running, and then write tests for the functions exported in `db.js`. You can use the test data in `seed.sql` to kick-start your fixtures and give you something to play with in development.

It is recommended that you use Mocha and Chai.

Your test suite should:

- Use fixtures to give your tests data to work with
- Use Mocha's `before/beforeEach/after/afterEach` hooks to set up and tear down your test database so that each test run is idempotent
- Test each exported function in the `db.js` file

For additional practice, consider expanding/changing the schema, adding more functions to `db.js`, and then writing tests for them.
