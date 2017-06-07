# Phase 1 -> 2 Assessment

This is the assessment for moving from phase 1 to phase 2.

To get started, create a new repository called `phase-1-assessment`. Do all of your work in this repo and submit it as your solution.

Skills covered:

- Programming in JS
- Node.js
- HTTP
- HTTP Apps
- HTML & CSS
- The Browser
- SQL

## General Requirements

- [ ] Solution is in a public repository called `phase-1-assessment`.
- [ ] Solution repository has 3 folders: `part-1`, `part-2`, and `part-3`.

## Part 1: Write tests and solutions for these functions

**TODO: modify the below exercises from javascript.info**

### Show a weekday
Write a function getWeekDay(date) to show the weekday in short format: 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'.

For instance:

```
let date = new Date(2012, 0, 3);  // 3 Jan 2012
alert( getWeekDay(date) );        // should output "TU"
```

### Which day of month was many days ago?

Create a function getDateAgo(date, days) to return the day of month days ago from the date.

For instance, if today is 20th, then getDateAgo(new Date(), 1) should be 19th and getDateAgo(new Date(), 2) should be 18th.

Should also work over months/years reliably:

```
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

P.S. The function should not modify the given date.

### Truncate the text

Create a function truncate(str, maxlength) that checks the length of the str and, if it exceeds maxlength -- replaces the end of str with the ellipsis character "…", to make its length equal to maxlength.

The result of the function should be the truncated (if needed) string.

For instance:

```
truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"

truncate("Hi everyone!", 20) = "Hi everyone!"
```

### Count properties

Write a function count(obj) that returns the number of properties in the object:

```
let user = {
  name: 'John',
  age: 30
};

alert( count(user) ); // 2
```

Try to make the code as short as possible.

P.S. Ignore symbolic properties, count only "regular" ones.

### Filter through function

We have a built-in method arr.filter(f) for arrays. It filters all elements through the function f. If it returns true, then that element is returned in the resulting array.

Make a set of "ready to use" filters:

```
inBetween(a, b) -- between a and b or equal to them (inclusively).
inArray([...]) -- in the given array.
```
The usage must be like this:
```
arr.filter(inBetween(3,6)) -- selects only values between 3 and 6.
arr.filter(inArray([1,2,3])) -- selects only elements matching with one of the members of [1,2,3].
```
For instance:

```
/* .. your code for inBetween and inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

## Part 2: Script to fetch GitHub data

Write an executable Node.js script that will list all repositories for a given GitHub user.

To handle authentication, provide a GitHub username and authentication token as environment variables.

Example usage:

```
$ GH_USERNAME=myusername GH_TOKEN=authtoken node repos.js

GitHub repos for myusername:

- repo_one
- repo_two private
- repo_three fork
- repo_four
- ...
```

In the above example, you would need to replace `myusername` with your GitHub username and `authtoken` with your GitHub authentication token.

The script should then print out a list of each repo name along with the string `private` if it is a private repo and `fork` if it is a fork.

### Requirements

- [ ] All files are stored under the `part-2/` folder
- [ ] No third party packages are used (code only uses the builtin Node.js library modules)
- [ ] Script requires that the environment variables `GH_USERNAME` and `GH_TOKEN` are set, and will throw an error if they are not
- [ ] Running script with valid username and token will print a list of all repositories for the given user
- [ ] The list of repositories printed includes the repository name
- [ ] The list of repositories printed notes private repos with the string `private`
- [ ] The list of repositories printed notes forked repos with the string `fork`

## Part 3: SQL schema for database
