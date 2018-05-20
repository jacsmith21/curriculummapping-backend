const bodyParser = require('body-parser');

module.exports = (app) => {
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }))

  // parse requests of content-type - application/json
  app.use(bodyParser.json())
}