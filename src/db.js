const mongoose = require('mongoose')
const config = require('./config')

module.exports = () => {
  mongoose.connect(config.url)
    .then(() => {
      console.log("Successfully connected to the database at " + config.url)
    }).catch(err => {
    console.error(err)
    process.exit()
  })
}