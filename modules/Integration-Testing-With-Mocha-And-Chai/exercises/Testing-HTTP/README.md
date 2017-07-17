# Exercise: Integration Tests with an HTTP Server

Write tests for a set of functions that interact with an HTTP API serving address book information.

Use the starter code in https://github.com/GuildCrafts/example-address-book-api. Fork the repo, get a local copy working, and read the code to see how it works. Things to notice:

- What are the different files? Why to do they exist?
- How are tests run? What libraries/tools to they use?
- How do the tests have data to work with? How is this test data separated from development data?

Then, practice writing integration tests by building a full test suite for the API endpoints in `api.js`. Your test suite should:

- Use fixtures to give your tests data to work with
- Use Mocha's `before/beforeEach/after/afterEach` hooks to make sure that your tests are using a clean dataset (i.e. not one modified by _previous_ tests)
- Test each endpoint with at least 1 "happy path" and 1 "sad path" test

It is recommended that you use Mocha and Chai.

For additional practice, consider expanding/changing the schema, adding more endpoints to the API, and then writing tests for them.
