const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

module.exports = (app) => {
  // Enable all cross origin requests. This will need to be changed eventually.
  app.use(cors())

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }))

  
  // parse requests of content-type - application/json
  app.use(bodyParser.json())

  app.use(express.static('static'))
  app.use(helmet())
}
