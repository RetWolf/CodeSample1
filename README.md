# Documentation
## What is this?
This is a code sample from my personal project, QuickBites, which is a food delivery service similar to Postmates or Doordash.
All code is documented by me.
I worked on this mainly with one other programmer, and a designer, although we haven't implemented any of their graphics into the app yet.
This project is not yet live as we are finishing a few functionality implementations.
Once all basic functionality is in we will be launching as a MVP, then focusing on rewriting the front-end to React and setting up Stripe for payments.

## What technology is used?
Node.JS along with Express/Mongoose makes up most of the back-end stuff. I got a lot of experience setting up use authentication from scratch. All user information is stored securely, and passwords are hashed using bcryptJS. Routes are also secured using express-session. Looking into switching to JWT for sessions.
I chose to use Mongo as the database for experience. I already know SQL fairly well and will be taking another class on "Advanced SQL" a few months from now
so why not get some experience with a noSQL database? Currently using Google Cloud Platform to run a VM with the Mongo server on it.
Views are currently rendered using Pug. I was comfortable with Pug prior to starting this and my knowledge of React wasn't really all there yet so I stuck with what I knew. Once the app
is deployed and functioning, I plan on switching to React and SCSS over the current Pug and CSS. 

## What is where?
User Authentication etc -- routes/users.js
Database Schemas -- models
Searching Database based on user input -- routes/dashboard.js
Styling -- public/stylesheets/style.css
