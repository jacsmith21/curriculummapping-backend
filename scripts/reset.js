const mongoose = require('mongoose');
const data = require('./data')
const db = require('../src/db')
const Course = require('../src/models/course.js');

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

      console.log(`Saving ${course.name}`)
      lookup[instance.name] = instance
    }

    console.log('Initializing the database!')
    console.log(data)

    let savedInformation = {}
    for (const item of data) {
      console.log(`Saving information from ${item.name}`)
      savedInformation[item.name] = {prerequisites: item.prerequisites, corequisites: item.corequisites}
      item.prerequisites = []
      item.corequisites = []

      await create(item)
    }

    for (const name in savedInformation) {
      if (!savedInformation.hasOwnProperty(name)) {
        continue;
      }

      console.log(`Updating ${name} with prereqs and coreqs`)
      const prerequisites = savedInformation[name].prerequisites
      const corequisites = savedInformation[name].corequisites

      resolve(prerequisites)
      resolve(corequisites)

      let instance = lookup[name]
      instance.prerequisites = prerequisites
      instance.corequisites = corequisites
      await Course.findByIdAndUpdate(instance._id, instance, {new: true})
    }
    console.log('Done initializing database!')
  })
})
