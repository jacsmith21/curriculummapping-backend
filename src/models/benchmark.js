const mongoose = require('mongoose');
const models = require('../models');

const Benchmark = mongoose.Schema({
  name: {type: String, unique: true, required: true}
}, {
  timestamps: true
})

module.exports = models.model('Benchmark', Benchmark);