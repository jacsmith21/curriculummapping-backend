const mongoose = require('mongoose');
const models = require('../models');

const Course = mongoose.Schema({
  name: String,
  instructor: String,
  description: String,
  learningOutcomes: [String]
}, {
  timestamps: true
});

module.exports = models.model('Course', Course);
