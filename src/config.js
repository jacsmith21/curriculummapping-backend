const minimist = require('minimist')
const fs = require('fs')
const config = minimist(process.argv.slice(2))

function read (path) {
  try {
    return fs.readFileSync(path)
  } catch (err) {}
}

module.exports = {
  url: config.url || 'mongodb://localhost:27017/curriculummapping',
  port: config.port || 3030,
  options: {
    cert: read('./ssl/fullchain.pem'),
    key: read('./ssl/privkey.pem')
  }
}