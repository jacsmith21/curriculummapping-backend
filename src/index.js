const express = require('express')
const db = require('./db')
const routes = require('./routes')
const middleware = require('./middleware.js')

const app = express()
middleware(app)
db(app)
routes(app)

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
});
