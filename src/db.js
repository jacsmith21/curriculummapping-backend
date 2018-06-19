const mongoose = require('mongoose')
const config = require('./config')

module.exports = () => {
  return new Promise((resolve) => {
    mongoose.connect(config.url, {autoIndex: false})
        .then(() => {
          console.log("Successfully connected to the database at " + config.url)
          resolve()
        }).catch(err => {
          console.error(err)
          process.exit()
        })
  })
}