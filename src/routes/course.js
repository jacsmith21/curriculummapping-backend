const courses = require('../models/course.js');

module.exports = (router) => {
  router.get('/courses', courses.getAll)
  router.post('/courses', courses.create)
  router.get('/courses/:id', courses.get)
  router.put('/courses/:id', courses.update)
  router.delete('/courses/:id', courses.delete)
}
