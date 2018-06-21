const benchmark = require('../models/benchmark.js');

module.exports = (router) => {
  router.get('/benchmarks', benchmark.getAll)
  router.post('/benchmarks', benchmark.create)
  router.get('/benchmarks/:id', benchmark.get)
  router.put('/benchmarks/:id', benchmark.update)
  router.delete('/benchmarks/:id', benchmark.delete)
}
