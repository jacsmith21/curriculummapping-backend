const mongoose = require('mongoose');
const data = require('./data')
const db = require('../src/db')
const course = require('../src/models/course.js');

let lookup = {}

db().then(() => {
  console.log('Dropping the database!')
  mongoose.connection.db.dropDatabase('curriculummapping')
}).then(() => {
  db().then(async () => {
    console.log('Initialization the database!')
    for (const item of data) {
      let prerequisites = item.prerequisites || []

      console.log('Creating ' + item.name)
      for (const [i, prerequisite] of prerequisites.entries()) {
        console.log('Replacing ' + prerequisite + ' with ' + lookup[prerequisite])
        prerequisites[i] = lookup[prerequisite]
      }

      let instance = new course(item)
      instance = await instance.save().catch(err => { throw err })
      console.log('Saved ' + instance.name)
      lookup[instance.name] = instance._id
    }

    console.log('Done initializing database!')
  })
})
