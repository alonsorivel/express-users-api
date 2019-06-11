# express-users-api

Small RESTful API to support user tracking software

## Instructions for the Build and Spinning

Pull this repository, build the users_api project, and bring up the users_api app with a PostgreSQL database.

```
git clone https://github.com/alonsorivel/express-users-api.git && cd express-users-api
docker-compose build users_api
docker-compose up
docker-compose down (when done testing!)
```

_There's a Postman collection (postman_collection.json), in the root of the repository, the developer can use to test the api with Postman._

To run this app in development mode, cd into /express-users-api and run the following command.

```
npm start
```

To run the tests, run the following command.

```
npm test
```

## Implementation details

This app is written in Javascript ES6 for Node.js. It makes use of various npm packages to handle the HTTP request routes as well as an in-memory MongoDB database. The data is not persisted between server restarts.

The HTTP requests are handled by Express. Express middleware like body-parser, cors, helmet, and morgan were installed to handle conversion of request bodies into JSON objects, HTTP headers, and logging. The package mongodb-memory-server provides an in-memory database. This in-memory database can be replaced once a permanent storage solution is decided. Joi takes care of data input validation. If a MongoDb database were to be provision for this app, Joi can be replaced by mongoose for data validation.

The API endpoints are not secured. JWT might be a good candidate to add authorization.

## Refactoring notes

- Move routing and middleware out of server.js
- Provide error handling middleware
- Take full advantage of helmet and cors to handle headers better
- Make tests match response object

## Code challenge

### Overview

Please complete this exercise with node.js and TypeScript. This exercise is intended to take no longer than 4 hours. Please limit the detail of your solution with that time in mind. Also, please include any questions, assumptions, plans or future considerations by providing a README with your submission.

### Problem

Assume that a company has contracted you to build a small RESTful API to support their new user tracking software. There are many node.js frameworks that could help you with this. For example, express, restify etc.

Data does not need to be persisted between server restarts.
