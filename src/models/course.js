const mongoose = require('mongoose');
const models = require('../models');

const Course = mongoose.Schema({
  name: {type: String, unique: true, required: true},
  title: String,
  instructor: String,
  sections: [String],
  inClass: Number,
  inLab: Number,
  averageGrade: String,
  percentFailure: Number,
  auDistribution: [Number],
  description: String,
  learningOutcomes: [String],
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, {
  timestamps: true
});

module.exports = models.model('Course', Course);
