const express = require('express');
const bodyParser = require('body-parser');
const course = require('./routes/course.js');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const config = require('./config.js');
const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect(config.url)
  .then(() => {
    console.log("Successfully connected to the database");
  }).catch(err => {
  console.error(err);
  process.exit();
});

// define a simple route
app.get('/', (req, res) => {
  res.json({"message": "Welcome to Jacob's application. This is the API!"});
});

course(app);

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
