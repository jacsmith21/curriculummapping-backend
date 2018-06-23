const mongoose = require('mongoose')
const data = require('./data')
const db = require('../src/db')
const Course = require('../src/models/course.js')
const Benchmark = require('../src/models/benchmark.js')

let lookup = {}

db().then(() => {
  console.log('Dropping the database!')
  mongoose.connection.db.dropDatabase('curriculummapping')
}).then(() => {
  db().then(async () => {
    const resolve = (courses) => {
      let toDelete = []
      for (const [i, name] of courses.entries()) {
        if (!(name in lookup)) {
          console.log(`Skipping ${name}`)
          toDelete.push(i)
          continue;
        }

        const id = lookup[name]._id
        console.log(`Replacing ${name} with ${id}`)
        courses[i] = id
      }

      for (let i = toDelete.length - 1; i >= 0; i--) {
        courses = courses.slice(0, toDelete[i]).concat(courses.slice(toDelete[i] + 1));
      }
    }

    const create = async (course) => {
      console.log(`Creating ${course.name}`)

      let instance = new Course(course)
      try {
        instance = await instance.save()
      } catch (e) {
        console.error(e)
        return
      }

      console.log(`Saved ${course.name}`)
      lookup[instance.name] = instance
    }

    console.log('Initializing the database!')
    console.log(data)

    let savedInformation = {}
    for (const item of data) {
      console.log(`Saving information from ${item.name}`)
      savedInformation[item.name] = {prerequisites: item.prerequisites, corequisites: item.corequisites, recommended: item.recommended}
      item.prerequisites = []
      item.corequisites = []
      item.recommended = []

      await create(item)
    }

    for (const name in savedInformation) {
      if (!savedInformation.hasOwnProperty(name)) {
        continue;
      }

      console.log(`Updating ${name} with prereqs and coreqs`)
      const prerequisites = savedInformation[name].prerequisites
      const corequisites = savedInformation[name].corequisites
      const recommended = savedInformation[name].recommended


      // resolving prerequisites
      for (const obj of prerequisites) {
        for (const key of Object.keys(obj)) {  // iterate over prerequisite & alternative
          const name = obj[key]

          if (!(name in lookup)) {
            console.log(`Skipping ${name}`)
            delete obj[key]
            continue
          }

          const id = lookup[name]._id
          console.log(`Replacing ${name} with ${id}`)
          obj[key] = id
        }

      }

      // resolving corequisites & recommended
      resolve(corequisites)
      resolve(recommended)

      let instance = lookup[name]
      instance.prerequisites = prerequisites
      instance.corequisites = corequisites
      await Course.findByIdAndUpdate(instance._id, instance, {new: true})
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
