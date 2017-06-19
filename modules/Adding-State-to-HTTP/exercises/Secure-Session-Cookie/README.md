# Secure Session Cookie

In this exercise were going to build 4 tiny express apps. Each one will build
upon the tools you learned and practiced in the last.

- In __App 1__ you'll store a simple string in a cookie in plain text
- In __App 2__ you'll store a serialized object in a cookie in plain text
- In __App 3__ you'll store a serialized user session in a cookie in plain text
- In __App 4__ you'll store a serialized and encrypted user session in a cookie

## Skills

- how to read and write cookies
- how to make an express middleware
- how to serialize and deserialize data using JSON
- how to encrypt a string using a private key and salt

## App 1

In App 1 we're going to store a single string in an HTTP cookie.

Using express, make an app that renders an html page that with a form that does
a post of the users name and then store their given name in a cookie. Parse
cookies using a cookie parsing node package. Display the users name on the
page if you have it in the cookie. also have a "clear name" button


### Search Terms

```
node express cookies
```

### Resources

- HTTP is a [Stateless Protocol](https://en.wikipedia.org/wiki/Stateless_protocol)
- https://www.nczonline.net/blog/2009/05/05/http-cookies-explained/
- https://en.wikipedia.org/wiki/HTTP_cookie
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- https://www.codementor.io/noddy/cookie-management-in-express-js-du107rmna


### Specs

- your code is all in `/app1`
- your dependencies are all listed in `/app1/package.json`
- your can start your server with `npm start`
- your server should use `node` and `express`
- when you visit 'http://localhost:3000/' you see:
  - the text "Welcome stranger! What's your name?"
  - a text input with the place holder "Your name here"
  - a submit button with the text "Save my name!"
- When you type your name into the text field and press "Save my name!" the page reloads and displays the text "Welcome back [the name you entered]!" only.
  - Example: If I enter "Ada Lovelace" and hit "Save my name!" The only thing I should see on the page is "Welcome back Ada Lovelace".
- If I reload the page I should still see the same text
- When I delete my cookies I should see the form again

## App 2 - Storing data in cookies

In App 2 we're going to store more than one piece of data in a cookie using JSON.

### Resources

- JSON

### Specs

- your code is all in `/app2`
- your dependencies are all listed in `/app2/package.json`
- your can start your server with `npm start`
- your server should use `node` and `express`
- when you visit 'http://localhost:3000/' you see:
  - the text "Welcome stranger! Tell us about yourself?"
  - a text input with the place holder "First name"
  - a text input with the place holder "Last name"
  - a text input with the place holder "Favorite color"
  - a submit button with the text "Thats me!"
- When you type your first name, last name and favorite color into the text fields and press "Thats me!" the page reloads and displays the text "Welcome back [first_name] [last_name] I bet your favorite color is [favorite_color]!".
  - Example: If I enter "Ada", "Lovelace", "Green" and hit "Save my name!" The only thing I should see on the page is "Welcome back Ada Lovelace I bet your favorite color is green".
- If I reload the page I should still see the same text
- When I delete my cookies I should see the form again


## App 3 - An insecure session

In App 3 we're going to move our cookie logic into an express middleware and use it as a [session](https://en.wikipedia.org/wiki/Session_(computer_science)).

The express middleware should look for the session cookie and if present deserialize it. Then it should place a session object at `request.session` so future request handlers can access the session. It also needs to serialize the session object back into the cookie before the response headers are sent.



 the session cookie, if present, and makes a session object available at `request.session`
^^^ Fragment, not sure where it fits

Build a middleware that serializes a session object into a session cookie using JSON. look at `session-cookie` as a guide. Each route should have access to the deserialized session cookie object at `req.session`. The cookie needs to be updated on each request. Update the form to store the users name in the session cookie object under the key `user_name`


### Resources

- https://expressjs.com/en/guide/using-middleware.html
- https://expressjs.com/en/guide/writing-middleware.html
- https://www.safaribooksonline.com/blog/2014/03/10/express-js-middleware-demystified/
- https://en.wikipedia.org/wiki/Session_(computer_science)
- https://expressjs.com/en/advanced/best-practice-security.html

### Specs

- your code is all in `/app3`
- your dependencies are all listed in `/app3/package.json`
- your can start your server with `npm start`
- your server should use `node` and `express`
- When you type your first name, last name and favorite color into the text fields and press "Thats me!" the page reloads and displays the text "Welcome back [first_name] [last_name] I bet your favorite color is [favorite_color]!".
  - Example: If I enter "Ada", "Lovelace", "Green" and hit "Save my name!" The only thing I should see on the page is "Welcome back Ada Lovelace I bet your favorite color is green".
- If I reload the page I should still see the same text
- When I delete my cookies I should see the form again
- all cookie related code should be in the express middleware
- the `homepage` and `form post` routes should only read and write data to and from `request.session` and not to the cookies header directly.


## App 4 - A secure session

Encrypt the session cookie using bcrypt



### Specs

- your code is all in `/app3`
- your dependencies are all listed in `/app3/package.json`
- your can start your server with `npm start`
- your server should use `node` and `express`
- When you type your first name, last name and favorite color into the text fields and press "Thats me!" the page reloads and displays the text "Welcome back [first_name] [last_name] I bet your favorite color is [favorite_color]!".
  - Example: If I enter "Ada", "Lovelace", "Green" and hit "Save my name!" The only thing I should see on the page is "Welcome back Ada Lovelace I bet your favorite color is green".
- If I reload the page I should still see the same text
- When I delete my cookies I should see the form again
- all cookie related code should be in the express middleware
- the `homepage` and `form post` routes should only read and write data to and from `request.session` and not to the cookies header directly.
- the data in the cookie should be encrypted and decrypted on every request.



## Solution

https://github.com/jason00111/http-authentication-214
