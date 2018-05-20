const course = require('./course.js')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({"message": "Welcome to Jacob's application. This is the API!"})
  });

  course(app)
}
