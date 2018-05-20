const mongoose = require('mongoose');

const Course = mongoose.Schema({
  name: String,
  instructor: String,
  description: String,
  learningOutcomes: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', Course);
