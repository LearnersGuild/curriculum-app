# Secure Session Cookie

In this exercise we're going to build 4 tiny express apps. Each one will build
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

Using express, make an app that renders an html page with a form that does
a post of the user's name and then stores the submitted name in a cookie. Parse
cookies using a cookie parsing node package. Display the user's name on the
page if you have it in the cookie. The user should also have a "clear name" button.


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

- Your code is all in `/app1`
- Your dependencies are all listed in `/app1/package.json`
- You can start your server with `npm start`
- Your server should use `node` and `express`
- When I visit 'http://localhost:3000/' I see:
  - The text "Welcome stranger! What's your name?"
  - A text input with the placeholder or label "Your name here"
  - A submit button with the text "Save my name!"
- When I type my name into the text field and press "Save my name!" the page reloads and displays the text "Welcome back [the name I entered]!" only.
  - Example: If I enter "Ada Lovelace" and hit "Save my name!" The only thing I should see on the page is "Welcome back Ada Lovelace".
- If I reload the page I should still see the same text
- When I delete my cookies or visit the site in an incognito window, I should see the form again.

## App 2 - Storing data in cookies

In App 2 we're going to store more than one piece of data in a cookie using JSON.

### Resources

- JSON

### Specs

- Your code is all in `/app2`
- Your dependencies are all listed in `/app2/package.json`
- You can start your server with `npm start`
- Your server should use `node` and `express`
- When I visit 'http://localhost:3000/' I see:
  - The text "Welcome, stranger! Tell us about yourself."
  - A text input with the placeholder or label "First name"
  - A text input with the placeholder or label "Last name"
  - A text input with the placeholder or label "Favorite color"
  - A submit button with the text "That's me!"
- When I type my first name, last name and favorite color into the text fields and press "That's me!", the page reloads and displays the text "Welcome back, [first_name] [last_name]. I bet your favorite color is [favorite_color]!"
  - Example: If I enter "Ada", "Lovelace", "Green" and hit "Save my name!" The only thing I should see on the page is "Welcome back, Ada Lovelace. I bet your favorite color is green!"
- If I reload the page I should still see the same text
- When I delete my cookies or visit the site in an incognito window, I should see the form again


## App 3 - An insecure session

In App 3 we're going to move our cookie logic into an express middleware and use it as a [session](https://en.wikipedia.org/wiki/Session_(computer_science)).

The express middleware should look for the session cookie and if present deserialize it. Then it should place a session object at `request.session` so future request handlers can access the session. It also needs to serialize the session object back into the cookie before the response headers are sent.

Build a middleware that serializes a session object into a session cookie using JSON. Look at `cookie-session` as a guide. Each route should have access to the deserialized session cookie object at `req.session`. The cookie needs to be updated on each form submission. When the user's first name, last name, and color are submitted, store them in the session cookie object under the keys `first_name`, `last_name`, and `color`.


### Resources

- https://expressjs.com/en/guide/using-middleware.html
- https://expressjs.com/en/guide/writing-middleware.html
- https://www.safaribooksonline.com/blog/2014/03/10/express-js-middleware-demystified/
- https://en.wikipedia.org/wiki/Session_(computer_science)
- https://expressjs.com/en/advanced/best-practice-security.html

### Specs

- Your code is all in `/app3`
- Your dependencies are all listed in `/app3/package.json`
- You can start your server with `npm start`
- Your server should use `node` and `express`
- When I type my first name, last name and favorite color into the text fields and press "That's me!", the page reloads and displays the text "Welcome back [first_name] [last_name] I bet your favorite color is [favorite_color]!".
  - Example: If I enter "Ada", "Lovelace", "Green" and hit "Save my name!" The only thing I should see on the page is "Welcome back Ada Lovelace I bet your favorite color is green".
- If I reload the page I should still see the same text
- When I delete my cookies or visit the site in an incognito window, I should see the form again.
- All cookie-related code should be in the express middleware
- The `homepage` and `form post` routes should only read and write data to and from `request.session` and not to the cookies header directly.


## App 4 - A secure session

Encrypt and decrypt the session cookie with `cryptr` or another encryption tool of your choice. If you want the encrypted cookies to be usable after you terminate and restart the application, choose a method that you consider secure enough for using a persistently stored encryption key, and document in the `README.md` file whatever the person installing the application needs to do to choose and persistently store a key.

### Resources

- [Environment Variables Considered Harmful for Your Secrets](http://movingfast.io/articles/environment-variables-considered-harmful/)

### Specs

- Your code is all in `/app4`
- Your dependencies are all listed in `/app4/package.json`
- You can start your server with `npm start`
- Your server should use `node` and `express`
- When I type my first name, last name and favorite color into the text fields and press "That's me!", the page reloads and displays the text "Welcome back [first_name] [last_name] I bet your favorite color is [favorite_color]!".
  - Example: If I enter "Ada", "Lovelace", "Green" and hit "Save my name!" The only thing I should see on the page is "Welcome back Ada Lovelace I bet your favorite color is green".
- If I reload the page I should still see the same text
- When I delete my cookies or visit the site in an incognito window, I should see the form again.
- All cookie related code should be in the express middleware
- The `homepage` and `form post` routes should read and write data only to and from `request.session` and not to the cookies header directly.
- The data in the cookie should be encrypted and decrypted on every request.



## Solutions

* [Trevor's Solution](https://github.com/bundacia/LG-Secure-Session-Cookie-Example-Solution) (app1 - app4)
* [Jason's Solution](https://github.com/jason00111/http-authentication-214) (app4 only)
