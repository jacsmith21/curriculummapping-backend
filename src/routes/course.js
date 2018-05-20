module.exports = (app) => {
  const courses = require('../controllers/courses.js');

  // Create a new Note
  app.post('/courses', courses.create);

  // Retrieve all courses
  app.get('/courses', courses.findAll);

  // Retrieve a single Note with noteId
  app.get('/courses/:noteId', courses.findOne);

  // Update a Note with noteId
  app.put('/courses/:noteId', courses.update);

  // Delete a Note with noteId
  app.delete('/courses/:noteId', courses.delete);
}
