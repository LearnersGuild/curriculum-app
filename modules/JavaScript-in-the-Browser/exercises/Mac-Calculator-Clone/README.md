# Mac Calculator Reimplementation

## Description

Reimplement the built-in Mac calculator as a web app.

This goal has 2 (or 3) linear stages. You must complete the specs of each stage before
progressing onto the next.

## Setup

1. Create a new repository
0. Within it create the files: `index.html`, `index.css`, and `index.js`
0. Do your best to reimplement the (basic version of the) Mac OS X Calculator


## Stage 1

In stage 1 you will only be using `HTML` and `CSS` to build the interface of your
calculator. You're only building the interface in this stage. You'll make the
make the calculator work in stage 2.

Here is an example of what your interface might look like.

![calculator-in-browser](https://cloud.githubusercontent.com/assets/8385/22572099/6786dd74-e957-11e6-9340-278e63aa3809.png)

But that isn't the only possible appearance. You will be reimplementing the Mac calculator, which implies
deciding how faithful to the original your version will be. Give that question some thought, and do some research to
help you make an informed decision. The Mac calculator has changed over time, and there have been criticisms
of both the look-and-feel and the functionality of this application (and its competitors). See, for example:

http://lowendmac.com/2015/mac-calculators-from-jobsian-simplicity-to-eye-candy/
https://apple.stackexchange.com/questions/214839/how-to-solve-the-issue-of-on-calculator-giving-different-results-on-iphone-v
https://github.com/jrpool/calculator
http://stulta.com/forumo/archives/2089
http://www.harold.thimbleby.net/cv/files/hucalc.pdf


### In this stage you will be using at least the following skills:

- HTML/CSS positioning
- CSS text/type styling
- Web Fonts
- Proper HTML formatting
- Proper CSS formatting
- Proper DOM positioning of assets
- Positioning with `inline`, `block` and `inline-block`
- CSS pseudo-selectors
- CSS transitions
- Chrome Developer Tools Element tab

### During this stage you should…

- Use [normalize.css](https://necolas.github.io/normalize.css/)
- NOT use any other css frameworks or libraries
- NOT use any JavaScript
- NOT use images
- NOT use `<table>` tags
- NOT use `<form>` tags
- NOT use `<input>` tags

### Unless your design requires exceptions, you're done when…

- All text is in the [Roboto](https://fonts.google.com/specimen/Roboto) web font
- Your `HTML` and `CSS` follows this [style guide](https://google.github.io/styleguide/htmlcssguide.html)
- The calculator is positioned in the center of the page, both vertically and horizontally
- The calculator is a fixed size. It does not change in size when the page resizes.
- If the window is too small for the calculator, the page scrolls, both vertically and horizontally
- Each button has a CSS transition, lasting 100ms, to a slightly darker background color on hover
- Each button has a CSS transition, lasting 100ms, to a slightly darker background color on click
- All class names re: the calculator are name-spaced under `.calculator-…`
- Your stylesheet contains little to no duplicate style declarations
- Your README.md file describes and motivates any improvements you have made to the original calculator’s look and feel

## Stage 2

In stage 2 you will be adding `JavaScript` to make the calculator work.

### In this stage you will be using at least the following skills:

- ES5 syntax (for maximum cross-browser compatibility)
- Registering event listeners
- Binding to the DOM Ready event
- JavaScript closures
- JavaScript callbacks
- JavaScript formatting
- Event Delegation
- Event bubbling
- Querying the DOM API
- Manipulating the DOM using the DOM API
- Avoiding using the DOM for state

### During this stage you should…

- Store the state of your calculator in `JavaScript`
- NOT use `jQuery` or any other `JavaScript` libraries or frameworks
- NOT use features introduced in `ES2015`
- NOT store or read state from the DOM

### Unless your design requires exceptions, you're done when…

- Your `JavaScript` is written in `ES5`
- Your `JavaScript` follows this [style guide](https://google.github.io/styleguide/jsguide.html)
- Your JavaScript defines no more than 1 global variable
- Typing a relevant key at any point is reflected on the calculator
- Typing a relevant key causes the corresponding button on the calculator to flash active, thus appearing to have been pressed
- The state of the calculator is not stored in the `DOM`
- The mathematical operations for your calculator are each their own function, and are defined outside of any DOM event handler
- The font size decreases as needed to fit long numbers
- The calculator calculates consistently and intuitively
- Your README.md file describes and motivates any improvements you have made to the original calculator’s operating rules

## Stage 3--Stretch

In stage 3 you are going to add a second calculator to the page. Both calculators will be exactly the same but work independently. This will likely require you to refactor some of the JavaScript you wrote in stage 2. Here is an example:

![two-calculators-in-browser](https://cloud.githubusercontent.com/assets/8385/22572109/72df42ba-e957-11e6-8c9e-c9efd39045c1.png)

### In this stage you will be using at least the following skills:

- Event delegation
- JavaScript Constructors
- Componentization
- Composition

### During this stage you should…

- duplicate the HTML for the calculator
- NOT try and render a calculator from `JavaScript`
- NOT use `jQuery` or any other `JavaScript` libraries or frameworks
- consider using a constructor called `Calculator`
- NOT give each calculator a unique `id` or `classname`

### Unless your design requires exceptions, you're done when…

- Each calculator acts independently.
- Clicking anywhere on a calculator focuses that calculator.
- Typing a relevant key affects the focused calculator.
- You use event delegation to avoid binding a `click` event listener to each button
- The focused calculator is `opacity: 1`
- The not-focused calculator is `opacity: 0.5`
