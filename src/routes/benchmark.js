const benchmark = require('../models/benchmark.js');

module.exports = (router) => {
  router.get('/benchmark', benchmark.getAll)
  router.post('/benchmark', benchmark.create)
  router.get('/benchmark/:id', benchmark.get)
  router.put('/benchmark/:id', benchmark.update)
  router.delete('/benchmark/:id', benchmark.delete)
}
