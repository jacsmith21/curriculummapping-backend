const mongoose = require('mongoose');
const models = require('../models');

const object = (name) => { return {type: mongoose.Schema.Types.ObjectId, ref: name} }

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
    economics: String,
    ll: String
  },
  description: String,
  learningOutcomes: [String],
  prerequisites: String,
  recommended: String,
  corequisites: String,
  benchmarks: [object('Benchmark')]
}, {
  timestamps: true
});

module.exports = models.model('Course', Course);
