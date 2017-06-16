# HTTP Authentication

## Skills

- Can build an HTTP server with express
- Can track individual users with cookies
- Can POST data to the server with a form
- Can designing a small SQL schema
- Can use `pg-promise` to communicate to a postgresql server

## Specs

- use express
- use the `session-cookie` node package
- when you visit `/` (the hompage) you see:
  - a link to `/signup`
  - a link to `/login`
- when you visit `/signup` you see:
  - a form with:
    - email
    - password
    - password confirmation
    - signup button
- when you submit the signup form with no values you should see the signup page
again but with the error "please provide an email and a password to sign up"
- when you submit the signup form with a value in the password field that does
not match the value in the password confirmation field, you should see the
signup page again but with the error "passwords do not match"
- when you visit `/login` you see:
  - a form with:
    - email
    - password
- when you submit the login form with no values you should see the login page
again but with the error "please provide an email and a password to login"
- when you submit a correct email with the incorrect password, you should see
the login page again but with the error "incorrect email or password"
- when you submit an incorrect email with any password, you should see
the login page again but with the error "incorrect email or password"
- when you are logged in
  - and you visit `/` (the homepage) you see "Welcome back ${email}"
