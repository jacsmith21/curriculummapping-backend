const course = require('./course.js')
const benchmark = require('./benchmark.js')
const express = require('express')
const axios = require('axios')


module.exports = (app) => {
  const router = express.Router({})

  router.get('/', (_, res) => res.json({"message": "Welcome to Jacob's application. This is the API!"}))

  router.post('/test', (req, res) => {
    axios.post('http://127.0.0.1:5000/', req.body)
      .then(response => res.json(response.data))
      .catch(err => res.error(err))
  })

  course(router)
  benchmark(router)
  app.use(router)
}
