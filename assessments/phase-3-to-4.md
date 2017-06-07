# Phase 3 -> 4 Assessment

This is the assessment for moving from phase 3 to phase 4. You'll work on one app, building it in three stages.

To get started, create a new repository called `phase-3-assessment`. Do all of your work in this repo and submit it as your solution.

As part of your evaluation for this assessment, you'll be building an additional feature with the evaluator. Read the [Pairing Exercise](#pairing-exercise) section for more detail.

Skills covered:

- Node.js
- HTTP Apps (w/ Express)
- HTML & CSS
- The Browser
- SQL

## Project Description

Build a community for record enthusiasts to review their favorite albums. The app is called **Vinyl**.

The client has provided basic wireframes and user stories (broken into 3 stages).

## Wireframes

Use these wireframes to guide your design.

Don't worry about using real images - just use placeholders for now.

![app flow](https://user-images.githubusercontent.com/709100/26892225-934387d8-4b85-11e7-82e3-d739b22f1dcf.png)

## Sample Data

Use this data to seed the `albums` table on your database.

| Title     | Artist          |
|:----------|:----------------|
| Kid A     | Radiohead       |
| Thriller  | Michael Jackson |
| Blue      | Joni Mitchell   |
| Graceland | Paul Simon      |

## General Requirements

- [ ] Solution is in a public repository called `phase-3-assessment`.
- [ ] All dependencies are declared in a `package.json` file.
- [ ] Express is used for the web server.
- [ ] PostgreSQL is used for the database.
- [ ] Database is seeded with at least 4 albums (check out the [sample data](#sample-data)).

## Stage 1: Basic User Authentication & Profiles

Allow users to sign up, sign in, view their profile page, and sign out.

#### Requirements

**Users can...**

- [ ] Navigate to "/" and see a basic splash page.
- [ ] See the name of the website on the splash page.
- [ ] See links to "Sign In" and "Sign Up" on the splash page.
- [ ] Sign up for an account with name, email, and password.
- [ ] Sign in to their account if they already have one.
- [ ] Be redirected to their public profile page after signing in (e.g. "/users/1").
- [ ] On their public profile page, see their name, email, and their join date.
- [ ] See the site-wide header on every page.
- [ ] See a link to "Profile" and "Sign Out" if they're logged in in the site-wide header.
- [ ] See links to "Sign In" and "Sign Up" if they're logged out in the site-wide header.

## Stage 2: Album Reviews

Allow users to see albums and leave reviews on them.

#### Requirements

**Users can...**

- [ ] View all albums on the home page (under "Records").
- [ ] View the most recent 3 reviews on the home page.
- [ ] Click on an album title to go to the album page (e.g. "/albums/1").
- [ ] See the site-wide header on the album page.
- [ ] See the name of the album on the album page.
- [ ] See all reviews for the album on album page sorted by newest first.
- [ ] Use an "Add review" button on the album page to pull up the new review form.
- [ ] Create a new review for an album using the new review form.
- [ ] See their created reviews on the album page.

**On the user's profile page, they can...**

- [ ] See their reviews sorted by newest first.
- [ ] Click delete icon "trash can" on ANY individual review.
- [ ] See a pop-up that says: "Are you sure you want to delete this review?" when clicking trash can icon
- [ ] Have the review deleted when confirming the pop-up.

## Stage 3: Validations & Authorization

Ensure that no invalid data gets saved to the database with validation. Also make sure that certain user actions are authorized.

#### Requirements

Users CANNOT save invalid data to the database. You don't need to show error messages to the user for the following.

- [ ] Users CANNOT sign up with an email that is already in use.
- [ ] A review's content must not be empty.

A user is authorized to perform certain actions on the site. You don't need to show error messages to the user for the following.

- [ ] Only logged in users can create/destroy reviews.
- [ ] Users may only delete their own reviews.

---

## Pairing Exercise

As part of the interview portion of this assessment, you will be pairing on a new feature with your evaluator.

**DO NOT COMPLETE THE FEATURES LISTED BELOW.** They are here simply so that you can see what _kinds_ of things you may be asked to build during your interview.

These are the possible features that your assessor may choose from to pair with you on (you will not know which one they'll choose until your interview):

#### Profile Features

**Users can...**

- [ ] See a "default" profile photo on their profile page before adding their own photo.
- [ ] Update their profile photo (consider using Uploadcare).
- [ ] See their profile photo next to their reviews.
- [ ] Receive a welcome email after creating an account.
- [ ] Visit user profile pages via pretty urls, like "/users/james-franco".

#### Review  Features

**Users can...**

- [ ] Visit album pages via pretty urls, like "/albums/thriller".
- [ ] Add a star rating to reviews (from 1-5) and see the star rating for each review of an album in star icons.
- [ ] See review content truncated to 400 characters max, with a link to view more on a album's page.
- [ ] See a relative published date, e.g. "2 days ago" on a album's page.

#### Commenting Features

**Users can...**

- [ ] Comment on individual reviews.
- [ ] See comment threads for a review.
- [ ] See the number of comments they've left on their public profile.
- [ ] Only add a comment when logged in.
- [ ] Only delete their own comments.

#### Validations & Authorization Features

**Users can...**

- [ ] View an error message when form validations fail, for the following validations:
  - Email is already in use.
  - Content for review must not be empty.
- [ ] View only the 10 most recent reviews on a album page (pagination).
- [ ] View a link/button to the "Next" 10 on the album page (pagination).
- [ ] View a link/button to the "Previous" 10 on the album page (pagination).
