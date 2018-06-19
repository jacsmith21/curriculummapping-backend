const course = require('./course.js')
const benchmark = require('./benchmark.js')
const express = require('express')

module.exports = (app) => {
  const router = express.Router({})

  router.get('/', (_, res) => res.json({"message": "Welcome to Jacob's application. This is the API!"}))

  course(router)
  benchmark(router)
  app.use(router)
}
