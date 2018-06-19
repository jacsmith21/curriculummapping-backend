const course = require('./course.js')
const express = require('express')

module.exports = (app) => {
  const router = express.Router()

  router.get('/', (req, res) => {
    res.json({"message": "Welcome to Jacob's application. This is the API!"})
  });

  course(router)
  app.use(router)
}
