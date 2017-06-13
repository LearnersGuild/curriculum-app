# Remember Me App

In this exercise were going to build a simple NodeJS / Express app that uses
cookies to remember the name of visitors to our app.



1. Create an empty directory & repository
0. run `npm init -y`
0. run `npm install --save express cookie-parser`
0. run `npm install --save-dev nodemon`
0. put your express app in `app.js`
0. start your app with `nodemon app.js`
0. open another terminal window
0. on the homepage, render a form that asks for Name with a single text input
0. When you submit that form it should `POST` to `/set-name`
0. Within the `POST` `/set-name` route, take the posted name and save it to the a cookie named `username`
