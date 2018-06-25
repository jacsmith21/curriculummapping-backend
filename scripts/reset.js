const mongoose = require('mongoose')
const data = require('./data')
const db = require('../src/db')
const Course = require('../src/models/course.js')
const Benchmark = require('../src/models/benchmark.js')

db().then(() => {
  console.log('Dropping the database!')
  mongoose.connection.db.dropDatabase('curriculummapping')
}).then(() => {
  db().then(async () => {
    console.log('Initializing the database!')
    for (const key of Object.keys(data)) {
      console.log(`Creating ${key}`)

      try {
        let instance = new Course(data[key])
        await instance.save()
      } catch (e) {
        console.error(e)
      }
    }

    for (const name of ['Benchmark 1.0', 'Benchmark 1.1', 'Benchmark 1.2', 'Benchmark 1.3', 'Benchmark 2.0']) {
      console.log(`Saving benchmark: ${name}`)

      let instance = new Benchmark({name: name})
      try {
        instance = await instance.save()
      } catch (e) {
        console.error(e)
      }
    }

    console.log('Done initializing database!')
  })
})
