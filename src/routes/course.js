const courses = require('../models/course.js');

module.exports = (app) => {
  app.post('/courses', courses.create);
  app.get('/courses', courses.getAll);
  app.get('/courses/:id', courses.get);
  app.put('/courses/:id', courses.update);
  app.delete('/courses/:id', courses.delete);
}
