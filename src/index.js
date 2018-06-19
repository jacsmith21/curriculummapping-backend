const express = require('express')
const db = require('./db')
const https = require('https')
const config = require('./config')
const routes = require('./routes')
const middleware = require('./middleware.js')

const app = express()
middleware(app)
db()
routes(app)

app.listen(config.port, () => console.log("Server is listening on port " + config.port))
https.createServer(config.options, app).listen(8443)
