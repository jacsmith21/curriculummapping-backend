const express = require('express')
const db = require('./db')
const config = require('./config')
const routes = require('./routes')
const middleware = require('./middleware.js')

const app = express()
middleware(app)
db()
routes(app)
app.get('/health-check', (req, res) => res.sendStatus(200));

app.listen(config.port, () => {
  console.log("Server is listening on port " + config.port)
});
