const minimist = require('minimist')
const config = minimist(process.argv.slice(2))
module.exports = {
  url: config.url || 'mongodb://localhost:27017/curriculummapping',
  port: config.port || 3030
}