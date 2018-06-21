const mongoose = require('mongoose');
const models = require('../models');

const Course = mongoose.Schema({
  name: {type: String, unique: true, required: true},
  title: String,
  maintainer: String,
  sections: [{section: String, instructor: String}],
  assessments: [{assessmentType: String, description: String}],
  inClass: Number,
  inLab: Number,
  averageGrade: String,
  percentFailure: Number,
  auDistribution: {
    math: Number,
    naturalScience: Number,
    complementaryStudies: Number,
    engineeringScience: Number,
    engineeringDesign: Number
  },
  caebAttributes: {
    knowledgeBase: String,
    problemAnalysis: String,
    investigation: String,
    design: String,
    tools: String,
    team: String,
    communication: String,
    professionalism: String,
    impacts: String,
    ethics: String,
    economics: String, ll: String
  },
  description: String,
  learningOutcomes: [String],
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  recommended: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  corequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, {
  timestamps: true
});

module.exports = models.model('Course', Course);
