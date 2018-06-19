const express = require('express')
const db = require('./db')
const https = require('https')
const fs = require('fs')
const config = require('./config')
const routes = require('./routes')
const middleware = require('./middleware.js')

const app = express()
middleware(app)
db()
routes(app)
app.get('/health-check', (req, res) => res.sendStatus(200));


const options = {
    cert: fs.readFileSync('./ssl/fullchain.pem'),
    key: fs.readFileSync('./ssl/privkey.pem')
}

app.listen(config.port, () => {
  console.log("Server is listening on port " + config.port)
})
https.createServer(options, app).listen(8443)
