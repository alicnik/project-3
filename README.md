# Project 3

All credit to Ali Bhimani and Richard Bekoe for their imagination, skill, and support. Without them, this project would not have been.

## Brief

Build a full-stack MERN web application and deploy to Heroku. Use an Express API to serve data from a MongoDB database, consuming the data on a front end built with React. Combine this with a public API to supplement the data presented on the front end. Implement thoughtful wireframes/user stories to establish core MVP. Deliver a visually impressive design. Automate testing on at least one RESTful resource on the back end. Code collaboratively using source control (GitHub) to resolve any conflicts.

## General Approach

We decided early on that, while we had any number of stretch goals in mind, we would focus on producing a polished app rather than one with extra functionality that was at risk of more bugs. After researching a number of public APIs, we landed on the https://ridb.recreation.gov/, an American government website listing "rec areas"—i.e. points of interest such as national parks—and "facilities", which encompassed campgrounds. We decided to build a camping app which would enable people to discover rec areas in any US state and find campgrounds nearby. 

## Technologies Used

- HTML
- CSS/Sass
- JavaScript
- React
- Node.js file system module
- Mongoose
- Express
- Node.js
- Cloudinary
- Axios
- bcrypt
- Json Web Token
- Mapbox
- React Hook Form
- React Tabs
- Yup
- Mocha
- Chai
- FontAwesome

## Wireframe

Prototype: https://www.figma.com/proto/j1Ma7hLvkwkZHrXgt4odsO/Wilderness?node-id=3%3A3&viewport=116%2C351%2C0.11993156373500824&scaling=scale-down

## Responsibilities

We resolved to work collaboratively wherever possible and maintained contact throughout development using conferencing apps. For efficiency, we did of course allocate certain responsbilities to individuals on a modular basis. The following were tasks for which I took primary responsiblity:

1. Data Mining

A challenge from the outset was the limit set by the RIDB API on the number of results any one request could return. There were thousands of points of interest and many more campgrounds. Fortunately, RIDB offers a data dump for all endpoints. We decided that it would be most effective for seeding purposes if we were to utilise the data dump and tailor it to our needs. I took over responsibility for this task as I had not yet had the opportunity to use the `fs` module. The data dump totalled approximatly 500MB and the data we needed for our MVP was distributed across a number of different files. 

I devised a solution which relied upon filtering and mapping the data into usable files that could be seeded into our database, see `./server/data/recAreaFilter.js` and `./server/data/facilitiesFilter.js`. The benefits of this approach were that the data on our back end contained only that which we needed to use and by filtering through the data dump we were able to apply quality control to ensure that our user experience would be consistent, for example ensuring that campgrounds always had contact details that we could display on the front end. As a natural consequence of the degree of oversight I had over the data we were using to display the rec areas and campgrounds, I had primary repsponsiblity for designing the rec area and campground models for our Mongoose schema and for writing the seed file.

2. Splashscreen & SVG Animation

3. Single Rec Area / Single Campground Pages

4. Star Rating Systems

5. React Context API

6. Cloudinary

7. My Account/Account Settings

## Achievements

## Challenges

## Conclusions

## Installation Instructions

Simply clone this repo and run `npm i`.
