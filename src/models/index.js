const mongoose = require('mongoose')

export const model = (name, schema) => {
  let model = mongoose.model(name, schema)

  // TODO: Use proper methods. Ex model.query... or model.methods...
  model.getAll = (req, res) => {
    model.find()
      .then(instances => {
        res.send(instances)
      }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
  }
  
  model.get = (req, res) => {
    model.findById(req.params.id)
      .then(instance => {
        res.send(instance)
      }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send(err)
      } else {
        return res.status(500).send(err)
      }
    })
  }
  
  model.create = (req, res) => {
    const instance = new model(req.body)

    instance.save()
      .then(data => {
        res.send(data)
      }).catch(err => {
      res.status(500).send(err)
    })
  }
  
  model.update = (req, res) => {
    model.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(instance => {
        res.send(instance);
      }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send(err);
      } else {
        return res.status(500).send(err);
      }
    });
  };

  model.delete = (req, res) => {
    model.findByIdAndRemove(req.params.id)
      .then(() => {
        res.send({message: "Instance deleted successfully!"});
      }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send(err);
      } else {
        return res.status(500).send(err);
      }
    });
  };

  return model
}
