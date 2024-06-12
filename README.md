# Tutoring-Services
A full stack web application designed using MongoDB, ExpressJS, ReactJS & NodeJS
# Problem Statement
Traditional learning platforms are all very scattered and lack unity. They usually employ their own faculties and are locked under a subscription based service. This model web application aims to unify both tutors and students into a single platform and remains only as a free common platform where the tutor and the student can interact.
# Methodology
In order to achieve this, we are developing a web-based platform using the following frameworks.
- MongoDB: A NoSQL database system.
- Express.js: A web application framework for Node.js
- React: A JavaScript Library for building user interfaces.
- Node.js: A JavaScript runtime environment.
# Working
- Create all express routes we need for the API.
- Create a MongoDB Atlas database and connect
- to our web application using a package called
mongoose.
- Create a mongoose model for both courses and the users. User model hashes and validates email and password. Course model contains structure of the tutor data.
- Define the functions for the routes called
controllers.
- Create react application and set up all pages.
- Create react contexts to provide global states to full react application.
- Using JSON web tokens, create a secure login/signup functionality.
- For vit.com domain allow for tutor logins with only the account owner’s data and the ability to add and delete. For vitstudent.com domain allow for student logins with complete access to all tutor data with the ability to join.

